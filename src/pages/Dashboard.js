import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PlacemarkService } from "../utils/placemark-service";

const Dashboard = ({ userid }) => {
  const [categories, setCategories] = useState([]);
  const [titleError, setTitleError] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      if (userid !== "") {
        const userCategories = await PlacemarkService.getUserCategories(userid);
        if (userCategories !== null) {
          setCategories(userCategories);
        }
      }
    };

    getCategories();
  }, [userid]);

  const addCategory = async (e) => {
    e.preventDefault();
    setTitleError(false);

    const title = document.getElementById("title").value;

    let error = false;

    if (title === "") {
      setTitleError(true);
      error = true;
    }

    if (!error) {
      const category = { title: title, userid: userid };
      const result = await PlacemarkService.createCategory(category);
      if (result !== null) {
        const tempCategories = categories.slice();
        tempCategories.push(result);
        setCategories(tempCategories);
      }
    }
  };

  const deleteCategory = async (id) => {
    await PlacemarkService.deleteCategory(id);
    const tempCategories = categories.slice();
    const index = tempCategories.findIndex((category) => category._id === id);
    tempCategories.splice(index, 1);
    setCategories(tempCategories);
    return false;
  };

  return (
    <section className="section">
      {categories
        ? categories.map((category, index) => (
            <div className="box box-link-hover-shadow" key={index}>
              <h2 className="title">{category.title}</h2>
              <Link to={"category/" + category._id} className="button">
                <span className="icon is-small">
                  <i className="fas fa-folder-open"></i>
                </span>
              </Link>
              <button
                onClick={() => deleteCategory(category._id)}
                className="button"
              >
                <i className="fas fa-trash"></i>
              </button>
            </div>
          ))
        : null}
      <form onSubmit={addCategory}>
        <div className="field">
          <label className="label">Category Title</label>
          <input
            className="input"
            id="title"
            type="text"
            placeholder="Enter category title"
            name="title"
          />
        </div>
        <button className="button is-link">Add Category</button>
      </form>
      {titleError ? <span>Please enter a title</span> : null}
    </section>
  );
};

export default Dashboard;

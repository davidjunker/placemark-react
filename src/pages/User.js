import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactFrappeChart from "react-frappe-charts";
import { PlacemarkService } from "../utils/placemark-service";

const User = ({ adminid }) => {
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  let { id } = useParams();
  useEffect(() => {
    const getData = async () => {
      const currUser = await PlacemarkService.getUser(id);
      setUser(currUser);
      const currData = await PlacemarkService.getAnalytics(adminid);
      setData(currData);
    };

    getData();
  }, [adminid, id]);

  const getLengths = () => {
    let categoryLength = 0;
    let poiLength = 0;
    let imageLength = 0;
    let categoriesIds = [];
    let poisIds = [];
    data.categories.forEach((category) => {
      if (category.userid === id) {
        categoryLength++;
        categoriesIds.push(category._id);
      }
    });

    data.pois.forEach((poi) => {
      if (categoriesIds.includes(poi.categoryid)) {
        poiLength++;
        poisIds.push(poi._id);
      }
    });

    data.images.forEach((image) => {
      if (poisIds.includes(image.poiid)) {
        imageLength++;
      }
    });

    const returnData = {
      categoryLength: categoryLength,
      poiLenght: poiLength,
      imageLength: imageLength,
    };
    return returnData;
  };

  const userAsstesData = {
    labels: ["Categories", "Pois", "Images"],
    datasets: [
      {
        values:
          data !== null
            ? [
                getLengths().categoryLength,
                getLengths().poiLenght,
                getLengths().imageLength,
              ]
            : [0, 0, 0],
      },
    ],
  };
  return user !== null ? (
    <section>
      <section className="section">
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Permission</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
              <td>{user.permission}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className="section">
        {data !== null ? (
          <section className="section columns is-vcentered">
            <div className="column">
              <h3 className="title">Compared Assets (Pie)</h3>
              <ReactFrappeChart type="pie" height={300} data={userAsstesData} />
            </div>
            <div className="column">
              <h3 className="title">Compared Asstes (Bar)</h3>
              <ReactFrappeChart
                type="bar"
                axisOptions={{
                  xAxisMode: "tick",
                  yAxisMode: "tick",
                  xIsSeries: 1,
                }}
                height={300}
                data={userAsstesData}
              />
            </div>
          </section>
        ) : null}
      </section>
    </section>
  ) : null;
};

export default User;

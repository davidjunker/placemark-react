import React, { useState, useEffect } from "react";
import { PlacemarkService } from "../utils/placemark-service";
import ListUsers from "../components/molecules/ListUsers";

const AdminDashboard = ({ userid }) => {
  const [permission, setPermission] = useState(false);
  const [data, setData] = useState([]);
  const [userPermission, setUserPermission] = useState(false);

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem("email"));
    if (email === "homer@simpson.com") {
      setUserPermission(true);
    }
    const getData = async () => {
      const tempData = await PlacemarkService.getAnalytics(userid);
      if (tempData !== null) {
        setData(tempData);
        setPermission(true);
      }
    };

    getData();
  }, [userid]);

  const reload = async () => {
    const tempData = await PlacemarkService.getAnalytics(userid);
    if (tempData !== null) {
      setData(tempData);
      setPermission(true);
    }
  };
  return userPermission ? (
    permission ? (
      <section>
        <section className="section">
          <h1 className="title">User List</h1>
          <ListUsers users={data.users} triggerReload={reload} />
        </section>
        <section class="section">
          <h1 class="title">Analytics</h1>
          <table class="table is-fullwidth">
            <thead>
              <tr>
                <th>Stat</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Users</td>
                <td>{data.users.length}</td>
              </tr>
              <tr>
                <td>Categories</td>
                <td>{data.categories.length}</td>
              </tr>
              <tr>
                <td>Pois</td>
                <td>{data.pois.length}</td>
              </tr>
              <tr>
                <td>Average categories per user</td>
                <td>{data.stats.averageCategoriesPerUser}</td>
              </tr>
              <tr>
                <td>Average pois per user</td>
                <td>{data.stats.averagePoisPerUser}</td>
              </tr>
              <tr>
                <td>Average pois per category</td>
                <td>{data.stats.averagePoisPerCategory}</td>
              </tr>
              <tr>
                <td>Least categories</td>
                <td>{data.stats.leastCategories}</td>
              </tr>
              <tr>
                <td>Most categories</td>
                <td>{data.stats.mostCategories}</td>
              </tr>
            </tbody>
          </table>
        </section>
      </section>
    ) : (
      <section className="section has-text-centered">
        <h1 className="title">Loading...</h1>
      </section>
    )
  ) : (
    <section className="section has-text-centered">
      <h1 className="title">Error</h1>
      <h3>
        You do not have access to this page. Please return to the dashboard.{" "}
      </h3>
    </section>
  );
};

export default AdminDashboard;

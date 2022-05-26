import React from "react";
import { Link } from "react-router-dom";
import { PlacemarkService } from "../../utils/placemark-service";

const ListUsers = ({ users, triggerReload }) => {
  const deleteUser = async (userid) => {
    await PlacemarkService.adminDeleteUser(userid);
    triggerReload();
  };
  return (
    <table class="table is-fullwidth">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Permission</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr key={index}>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.email}</td>
            <td>{user.permission}</td>
            <td>
              <Link to={"/user/" + user._id} className="ui icon button">
                <i className="fas fa-folder-open"></i>
              </Link>
            </td>
            <td>
              <button
                onClick={() => deleteUser(user._id)}
                class="ui icon button"
              >
                <i class="fas fa-trash"></i>
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ListUsers;

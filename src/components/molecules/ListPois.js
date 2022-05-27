import React from "react";
import { Link } from "react-router-dom";

const ListPois = ({ pois, deletePoi }) => {
  return (
    <table className="table is-fullwidth">
      <thead>
        <tr>
          <th>Poi</th>
          <th>Description</th>
          <th>Latitude</th>
          <th>Longitude</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {pois.length
          ? pois.map((poi, index) => (
              <tr key={index}>
                <td>{poi.name}</td>
                <td>{poi.description}</td>
                <td>{poi.latitude}</td>
                <td>{poi.longitude}</td>
                <td>
                  <Link to={"/poi/" + poi._id} className="ui icon button">
                    <i className="fas fa-folder-open"></i>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => deletePoi(poi._id)}
                    className="ui icon button"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  );
};

export default ListPois;

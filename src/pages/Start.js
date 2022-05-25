import React from "react";
import frontimage from "../static/images/poi-front-image.jpeg";

const Start = () => {
  return (
    <div className="Start columns is-vcentered ">
      <div className="column has-text-centered">
        <span> Sign up or Log in... </span>
      </div>
      <div className="column">
        <img src={frontimage} alt="frontimage" />
      </div>
    </div>
  );
};

export default Start;

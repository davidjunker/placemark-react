import React from "react";
import frontimage from "../static/images/poi-front-image.jpeg";

const Start = () => {
  return (
    <div class="Start columns is-vcentered ">
      <div class="column has-text-centered">
        <h> Sign up or Log in... </h>
      </div>
      <div class="column">
        <img src={frontimage} alt="frontimage" />
      </div>
    </div>
  );
};

export default Start;

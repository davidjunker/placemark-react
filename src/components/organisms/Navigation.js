import React from "react";
import PlacemarkBrand from "../molecules/PlacemarkBrand";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <Link to="/">
          <PlacemarkBrand />
        </Link>
      </div>
      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <Link to="/login" class="button" id="login">
                {" "}
                Log in{" "}
              </Link>
              <Link to="/signup" class="button" id="signup">
                {" "}
                Sign up{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

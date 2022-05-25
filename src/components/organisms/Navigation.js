import React from "react";
import PlacemarkBrand from "../molecules/PlacemarkBrand";
import { PlacemarkService } from "../../utils/placemark-service";
import { Link, useHistory } from "react-router-dom";

const Navigation = ({ loggedIn, logoutUser }) => {
  const history = useHistory();

  const logout = async () => {
    await PlacemarkService.logout();
    logoutUser();
    history.push("/");
  };
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <Link to="/">
          <PlacemarkBrand />
        </Link>
      </div>
      {loggedIn ? (
        <div className="navbar-menu" id="navMenu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/dashboard" id="dashboard" className="button">
                  {" "}
                  Dashboard{" "}
                </Link>
                <Link
                  id="admin-dashboard"
                  className="button "
                  to="/admin-dashboard"
                >
                  {" "}
                  Admin Dashboard{" "}
                </Link>
                <Link id="account" className="button" to="/account">
                  {" "}
                  Account{" "}
                </Link>
                <Link id="logout" className="button" to="/" onClick={logout}>
                  {" "}
                  Logout{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                <Link to="/login" className="button" id="login">
                  {" "}
                  Log in{" "}
                </Link>
                <Link to="/signup" className="button" id="signup">
                  {" "}
                  Sign up{" "}
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;

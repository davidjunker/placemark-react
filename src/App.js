import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { PlacemarkService } from "./utils/placemark-service";
import Navigation from "./components/organisms/Navigation";
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const [userid, setUserid] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const tempUserid = JSON.parse(localStorage.getItem("userid"));
    const token = JSON.parse(localStorage.getItem("token"));

    if (
      tempUserid !== "" &&
      tempUserid !== null &&
      token !== "" &&
      token !== null
    ) {
      PlacemarkService.authenticate(token);
      setUserid(tempUserid);
      setLoggedIn(true);
    }
  }, []);

  const loginUser = (tempUserid) => {
    setUserid(tempUserid);
    setLoggedIn(true);
  };

  const logoutUser = () => {
    setLoggedIn(false);
    setUserid(false);
  };

  return (
    <div className="App">
      <Navigation loggedIn={loggedIn} logoutUser={logoutUser} />
      <Switch>
        <Route exact path="/">
          {loggedIn ? <Dashboard /> : <Start />}
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login loginUser={loginUser} />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

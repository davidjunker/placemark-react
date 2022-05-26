import React, { useState, useEffect } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import { PlacemarkService } from "./utils/placemark-service";
import Navigation from "./components/organisms/Navigation";
import Start from "./pages/Start";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Category from "./pages/Category";
import Poi from "./pages/Poi";
import Account from "./pages/Account";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [userid, setUserid] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const tempUserid = JSON.parse(localStorage.getItem("userid"));
    // const token = JSON.parse(localStorage.getItem("token"));
    const email = JSON.parse(localStorage.getItem("email"));
    const password = JSON.parse(localStorage.getItem("password"));

    if (
      tempUserid !== "" &&
      tempUserid !== null &&
      email !== "" &&
      email !== null &&
      password !== "" &&
      password !== null
      // token !== "" &&
      // token !== null
    ) {
      // PlacemarkService.login(email, password);
      // setUserid(tempUserid);
      // setLoggedIn(true);
      logUserIn(email, password, tempUserid);
    }
  }, []);

  const logUserIn = async (email, password, tempUserid) => {
    await PlacemarkService.login(email, password);
    setUserid(tempUserid);
    setLoggedIn(true);
  };

  const loginUser = (tempUserid) => {
    if (tempUserid !== null && tempUserid !== "") {
      setUserid(tempUserid);
      setLoggedIn(true);
    }
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
          {loggedIn ? <Dashboard userid={userid} /> : <Start />}
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route path="/login">
          <Login loginUser={loginUser} />
        </Route>
        <Route path="/dashboard">
          <Dashboard userid={userid} />
        </Route>
        <Route path="/category/:id">
          <Category />
        </Route>
        <Route path="/poi/:id">
          <Poi />
        </Route>
        <Route path="/account">
          <Account userid={userid} logoutUser={logoutUser} />
        </Route>
        <Route path="/admin-dashboard">
          <AdminDashboard userid={userid} />
        </Route>
      </Switch>
    </div>
  );
};

export default App;

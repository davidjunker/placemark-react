import React, { useState } from "react";
import { PlacemarkService } from "../utils/placemark-service";
import { useHistory } from "react-router-dom";

const Login = ({ loginUser }) => {
  const history = useHistory();
  const [emailError, setEmailError] = useState(false);
  const [mail, setMail] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const login = async (e) => {
    e.preventDefault();

    setEmailError(false);
    setPasswordError(false);

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    let error = false;

    if (email === "" || !/[^@\s]+@[^@\s]+\.[^@\s]+/.test(email)) {
      setEmailError(true);
      setMail(email);
      error = true;
    }
    if (password === "") {
      setPasswordError(true);
      error = true;
    }

    if (!error) {
      await PlacemarkService.login(email, password);
      loginUser(JSON.parse(localStorage.getItem("userid")));
      history.push("/");
    }
  };
  return (
    <section className="section">
      <h1 className="title">Log in</h1>
      <form onSubmit={login}>
        <div className="field">
          <label className="label">Email</label>{" "}
          <input
            className="input"
            id="loginEmail"
            type="text"
            placeholder="Enter email"
            name="email"
          />
        </div>
        <div className="field">
          <label className="label">Password</label>{" "}
          <input
            className="input"
            id="loginPassword"
            type="password"
            placeholder="Enter Password"
            name="password"
          />
        </div>
        <div className="field is-grouped">
          <button className="button is-link">Submit</button>
        </div>
      </form>
      <div>
        {emailError ? (
          mail === "" ? (
            <div>Please enter an email</div>
          ) : (
            <div>Please enter a valid email</div>
          )
        ) : null}
        {passwordError ? <div>Please enter a password</div> : null}
      </div>
    </section>
  );
};

export default Login;

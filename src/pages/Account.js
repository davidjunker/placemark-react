import React, { useState } from "react";
import { PlacemarkService } from "../utils/placemark-service";
import { useHistory } from "react-router-dom";

const Account = ({ userid, logoutUser }) => {
  const history = useHistory();
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [mail, setMail] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const update = async (e) => {
    e.preventDefault();

    setFirstNameError(false);
    setLastNameError(false);
    setEmailError(false);
    setPasswordError(false);

    const firstName = document.getElementById("signupFirstName").value;
    const lastName = document.getElementById("signupLastName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;

    let error = false;

    if (firstName === "") {
      setFirstNameError(true);
      error = true;
    }
    if (lastName === "") {
      setLastNameError(true);
      error = true;
    }
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
      console.log(firstName, lastName, email, password);
      await PlacemarkService.updateUser(
        firstName,
        lastName,
        email,
        password,
        userid
      );

      history.push("/");
    }
  };

  const deleteUser = async () => {
    await PlacemarkService.deleteUser(userid);
    logoutUser();
    history.push("/");
  };
  return (
    <section>
      <section className="section">
        <h1 className="title">Update your account</h1>
        <form onSubmit={update}>
          <label className="label">Name</label>
          <div className="field is-horizontal">
            <div className="field-body">
              <div className="field">
                <input
                  className="input"
                  id="signupFirstName"
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                />
              </div>
              <div className="field">
                <input
                  className="input"
                  id="signupLastName"
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                />
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Email</label>{" "}
            <input
              className="input"
              id="signupEmail"
              type="text"
              placeholder="Enter email"
              name="email"
            />
          </div>
          <div className="field">
            <label className="label">Password</label>{" "}
            <input
              className="input"
              id="signupPassword"
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
          {firstNameError ? <div>Please enter a first name</div> : null}
          {lastNameError ? <div>Please enter a last name</div> : null}
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
      <section class="section">
        <h2 class="title">Delete your account</h2>
        <button onClick={() => deleteUser()} class="button is-danger">
          <span class="icon-is-small">
            <i class="fas fa-trash"></i>
          </span>
        </button>
      </section>
    </section>
  );
};

export default Account;

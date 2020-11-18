import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import validator from "email-validator";
import loginAction from "../../actions/login";
import "./login.css";

const disabledButton = {
  opacity: 0.3,
};

function Login({ auth, loginAction }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // if user is authenticated get directed to feed
  let history = useHistory();
  useEffect(() => {
    (() => {
      if (auth.loggedIn === true) {
        history.push("/feed");
      }
    })();
  });

  // handle login submit
  function handleOnsubmit(e) {
    e.preventDefault();
    loginAction({
      email,
      password,
    });
  }

  return (
    <div className="auth-container">
      <div>
        <div className="login-container">
          <div className="login-app-name">
            <span> InstaPic</span>
          </div>
          <div className="login-form">
            <form onSubmit={(e) => handleOnsubmit(e)}>
              <input
                value={email}
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <input
                value={password}
                placeholder="password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <button
                type="submit"
                disabled={
                  !(
                    email !== "" &&
                    validator.validate(email) &&
                    password !== ""
                  )
                }
                style={
                  email !== "" && validator.validate(email) && password !== ""
                    ? {}
                    : disabledButton
                }
              >
                Log In
              </button>
            </form>
          </div>
        </div>
        <div className="login-signup-option">
          <span>
            Don't have an account? &nbsp;
            <b>
              <Link to="/signup"> Sign up</Link>
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { loginAction })(Login);

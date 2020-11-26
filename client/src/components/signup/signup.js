import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import validator from "email-validator";
import server from "./../../api/server";
import correct from "./../icons/correct.svg";
import incorrect from "./../icons/incorrect.svg";
import signupAction from "../../actions/signup";
import "./signup.css";

// Styles to be changed for input
const inputIsValid = {
  backgroundImage: `url(${correct}) `,
};

const inputIsInvalid = {
  backgroundImage: `url(${incorrect})`,
};

const disabledButton = {
  opacity: 0.3,
};

function Signup({ authStatus, signupAction }) {
  // state
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [isNameValid, setIsNameValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);
  const [allInputsAreValid, SetAllInputsAreValid] = useState(false);

  // if user is authenticated get directed to feed
  let history = useHistory();
  (() => {
    if (authStatus.loggedIn === true) {
      history.push("/feed");
    }
  })();

  // Signup on submit helper.
  function handleSubmit(e) {
    e.preventDefault();
    signupAction({
      name,
      email,
      password,
      userName: username,
    });
  }
  // handle input field onChange
  function handleNameInputChange(e) {
    setName(e.target.value);
  }

  function handleEmailInputChange(e) {
    const email = e.target.value;
    setEmail(email);
  }

  function handleUsernameInputChange(e) {
    setUsername(e.target.value);
  }
  function handlePasswordInputChange(e) {
    setPassword(e.target.value);
    if (e.target.value.length >= 5) {
      setIsPasswordValid(inputIsValid);
    } else {
      setIsPasswordValid(inputIsInvalid);
    }
    if (e.target.value === "") {
      setIsPasswordValid(null);
    }
  }

  // handle onBlur for the input fields
  function handleNameInputBlur(e) {
    if (e.target.value !== "") {
      setIsNameValid(inputIsValid);
    } else {
      setIsNameValid(null);
    }
  }

  function handleEmailInputBlur(e) {
    const email = e.target.value;
    setEmail(email);
    if (validator.validate(email)) {
      setIsEmailValid(inputIsValid);
    } else if (!validator.validate(email)) {
      setIsEmailValid(inputIsInvalid);
    }
    if (email === "") {
      setIsEmailValid(null);
    }
  }

  function handleUsernameInputBlur(e) {
    if (e.target.value !== "") {
      setIsUsernameValid(inputIsValid);
    } else {
      setIsUsernameValid(null);
    }
  }

  function handlePasswordInputBlur(e) {
    if (e.target.value.length >= 5) {
      setIsPasswordValid(inputIsValid);
    } else {
      setIsPasswordValid(inputIsInvalid);
    }
    if (e.target.value === "") {
      setIsPasswordValid(null);
    }
  }
  // check if the provided email and username are unique in the database
  useEffect(() => {
    (async function () {
      if (isEmailValid === inputIsValid) {
        const response = await server.get("/users/isEmailUnique/" + email);
        if (response.data.emailExists === true) {
          setIsEmailValid(inputIsInvalid);
        }
      }
    })();
  }, [isEmailValid, email]);

  useEffect(() => {
    (async function () {
      if (isUsernameValid === inputIsValid) {
        const response = await server.get(
          "/users/isUsernameUnique/" + username
        );
        if (response.data.usernameExists === true) {
          setIsUsernameValid(inputIsInvalid);
        }
      }
    })();
  }, [isUsernameValid, username]);

  // use effectHook to see if the all the data is valid and the form is ready to be submitted
  useEffect(() => {
    if (
      validator.validate(email) &&
      name !== "" &&
      username !== "" &&
      password.length >= 5 &&
      isUsernameValid === inputIsValid &&
      isEmailValid === inputIsValid
    ) {
      SetAllInputsAreValid(true);
    } else {
      SetAllInputsAreValid(false);
    }
  }, [email, name, username, password.length, isUsernameValid, isEmailValid]);

  return (
    <div className="auth-container">
      <div>
        <div className="signup-container">
          <div className="signup-app-name">
            <span> InstaPic</span>
          </div>
          <div className="signup-form">
            <form onSubmit={(e) => handleSubmit(e)}>
              <input
                placeholder="name"
                style={isNameValid}
                onFocus={() => setIsNameValid(null)}
                onBlur={(e) => handleNameInputBlur(e)}
                onChange={(e) => handleNameInputChange(e)}
              ></input>
              <input
                placeholder="email"
                style={isEmailValid}
                onFocus={() => setIsEmailValid(null)}
                onBlur={(e) => handleEmailInputBlur(e)}
                onChange={(e) => handleEmailInputChange(e)}
              />
              <input
                placeholder="username"
                maxlength="7"
                style={isUsernameValid}
                onFocus={() => setIsUsernameValid(null)}
                onBlur={(e) => handleUsernameInputBlur(e)}
                onChange={(e) => handleUsernameInputChange(e)}
              />
              <input
                placeholder="password"
                type="password"
                onFocus={() => setIsPasswordValid(null)}
                onBlur={(e) => handlePasswordInputBlur(e)}
                onChange={(e) => handlePasswordInputChange(e)}
                style={isPasswordValid}
              />
              <button
                type="submit"
                disabled={!allInputsAreValid}
                style={allInputsAreValid ? {} : disabledButton}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="signup-login-option">
          <span>
            Have an account? &nbsp;
            <b>
              <Link to="/login"> Log in</Link>
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    authStatus: state.auth,
  };
};

export default connect(mapStateToProps, { signupAction })(Signup);

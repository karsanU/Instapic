import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import validator from "email-validator";
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

function Signup({ authStatus, signupAction }) {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(null);
  const [isUsernameValid, setIsUsernameValid] = useState(null);
  const [isNameValid, setIsNameValid] = useState(null);
  const [isPasswordValid, setIsPasswordValid] = useState(null);

  // if user is authenticated get directed to feed
  if (authStatus.loggedIn) {
    history.push("/feed");
  }

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
      setIsNameValid(inputIsValid);
    } else {
      setIsNameValid(null);
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
                onBlur={(e) => handleNameInputBlur(e)}
                onChange={(e) => handleNameInputChange(e)}
              ></input>
              <input
                placeholder="email"
                style={isEmailValid}
                onBlur={(e) => handleEmailInputBlur(e)}
                onChange={(e) => handleEmailInputChange(e)}
              />
              <input
                placeholder="username"
                style={isUsernameValid}
                onChange={(e) => handleUsernameInputChange(e)}
              />
              <input
                placeholder="password"
                type="password"
                onBlur={(e) => handlePasswordInputBlur(e)}
                style={isPasswordValid}
                onChange={(e) => handlePasswordInputChange(e)}
              />
              <button type="submit"> Sign Up</button>
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

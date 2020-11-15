import React from "react";
import "./signup.css";
import { Link } from "react-router-dom";

function Signup() {
  return (
    <div class="auth-container">
      <div>
        <div class="signup-container">
          <div class="signup-app-name">
            <span> InstaPic</span>
          </div>
          <div class="signup-form">
            <form>
              <input placeholder="email" />
              <input placeholder="password" type="password" />
              <input placeholder="password" type="password" />
              <input placeholder="username" />
              <button type="submit"> Sign Up</button>
            </form>
          </div>
        </div>
        <div class="signup-login-option">
          <span>
            Have an account? &nbsp;
            <b>
              {" "}
              <Link to="/login"> Log in</Link>
            </b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Signup;

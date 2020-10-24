import React from "react";
import "./login.css";

function Login() {
  return (
    <div class="auth-container">
      <div>
        <div class="login-container">
          <div class="login-app-name">
            <span> InstaPic</span>
          </div>
          <div class="login-form">
            <form>
              <input placeholder="email" />
              <input placeholder="password" />
              <button type="submit"> Log In</button>
            </form>
          </div>
        </div>
        <div class="login-signup-option">
          <span>
            Don't have an account? &nbsp;
            <b> <a href=""> Sign up</a></b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;

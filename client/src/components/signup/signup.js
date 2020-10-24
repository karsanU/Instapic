import React from 'react'
import './signup.css'
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
              <input placeholder="password" />
              <input placeholder="username" />
              <input placeholder="password" />
              <button type="submit"> Sign Up</button>
            </form>
          </div>
        </div>
        <div class="signup-login-option">
          <span>
          Have an account?  &nbsp;
            <b> <a href=""> Log in</a></b>
          </span>
        </div>
      </div>
    </div>
    )
}

export default Signup

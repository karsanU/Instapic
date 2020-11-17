import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./navbar.css";
import Home from "../icons/home";
import Heart from "../icons/heart";
import Avatar from "@material-ui/core/Avatar";
// testing commit
function Navbar() {
  const history = useHistory();
  // handle logout button click 
  function handleOnClickLogout() {}
  // when the user profile button is clicked on the navbar present options
  const [profileOptions, setProfileOptions] = useState(null);
  function handleOnClickProfileOptions() {
    setProfileOptions(
      <div className="navbar-profile-options-container">
        <div className="navbar-profile-option-triangle"></div>
        <div className="navbar-profile-option">
          <div className="navbar-profile-option-profile-background">
            <div
              className="navbar-profile-option-profile"
              onClick={() => {
                history.push("/user");
              }}
            >
              profile
            </div>
          </div>
          <div
            className="navbar-profile-option-logout"
            onClick={() => {
              handleOnClickLogout();
            }}
          >
            <b>Logout</b>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="navbar">
      {profileOptions !== null ? (
        <div
          class="profile-options-background"
          onClick={() => {
            setProfileOptions(null);
          }}
        ></div>
      ) : null}
      <div id="navItems-container">
        <h1 id="appName">
          <Link to="/"> InstaPic </Link>
        </h1>
        <input type="text" placeholder="Search" id="search" />
        <div id="nav-iconContainer">
          <Home cssclassName="nav-icon" />
          <Heart cssclassName="nav-icon" height={22} width={22} />
          <Avatar
            id="navbar-profile-icon"
            onClick={(e) => {
              handleOnClickProfileOptions();
            }}
          ></Avatar>
        </div>
      </div>
      {profileOptions}
    </div>
  );
}

export default Navbar;

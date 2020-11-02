import React from "react";
import { Link } from "react-router-dom";

import "./navbar.css";
import Home from "../icons/home";
import Heart from "../icons/heart";
import Avatar from "@material-ui/core/Avatar";

function Navbar() {
  return (
    <div id="navbar">
      <div id="navItems-container">
        <Link to="/"  >
          <h1 id="appName"> InstaPic</h1>
        </Link>
        <input type="text" placeholder="Search" id="search" />
        <div id="nav-iconContainer">
          <Home cssClass="nav-icon" />
          <Heart cssClass="nav-icon" height={22} width={22} />
          <Avatar id="navbar-profile-icon" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;

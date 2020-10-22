import React from "react";
import Avatar from "@material-ui/core/Avatar";
import "./header.css";
function Header() {
  return (
    <div id="profile-header">
      <div id="profile-header-avatar-container">
        <Avatar id="profile-header-avatar" />
      </div>
      <div id="profile-header-user-info">
        <div class="profile-header-user-username  profile-header-row ">
          <span> hamishrajiv </span>
          <button id="profile-header-user-follow">Follow</button>
        </div>
        <div class="profile-header-user-followerInfo profile-header-row ">
          <span class="profile-header-user-followerInfo-span">
            <b> 7 </b> posts
          </span>
          <span class="profile-header-user-followerInfo-span">
            <b> 100 </b> followers
          </span>
          <span class="profile-header-user-followerInfo-span">
            <b> 100</b> following
          </span>
        </div>
        <div class="profile-header-user-nameAndBio">
          <div>
            <span>
              <b>Hamish Rajiv </b>
            </span>
          </div>
          <div>
            <p>
              I take photos 
              <br></br>
              I punish bad boys
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

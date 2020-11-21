import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import "./header.css";
import axios from "axios";
function Header({ user, auth }) {
  const [followStatus, setFollowStatus] = useState(
    auth.following.includes(user.userName)
  );

  // handle follow
  async function handleFollow() {
    setFollowStatus(true);
    try {
      const res = await axios({
        method: "post",
        url: `http://localhost:3001/users/follow`,
        data: { userName: user.userName },

        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div id="profile-header">
      <div id="profile-header-avatar-container">
        <Avatar id="profile-header-avatar" />
      </div>
      <div id="profile-header-user-info">
        <div className="profile-header-user-username  profile-header-row ">
          <span> {user.name} </span>
          {auth.userName !== user.userName ? (
            <button
              id="profile-header-user-follow"
              onClick={() => handleFollow()}
            >
              Follow
            </button>
          ) : null}
        </div>
        <div className="profile-header-user-followerInfo profile-header-row ">
          <span className="profile-header-user-followerInfo-span">
            <b> {user.posts.length} </b> posts
          </span>
          <span className="profile-header-user-followerInfo-span">
            <b> {user.followers.length} </b> followers
          </span>
          <span className="profile-header-user-followerInfo-span">
            <b> {user.following.length}</b> following
          </span>
        </div>
        <div className="profile-header-user-nameAndBio">
          <div>
            <span>
              <b> {user.userName} </b>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;

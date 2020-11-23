import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { updateUser } from "../../../actions/user";
import "./header.css";
import axios from "axios";
function Header({ user = {}, auth }) {
  const [followStatus, setFollowStatus] = useState(
    user.followers.includes(auth._id)
  );
  const [followerLen, setFollowerLen] = useState(user.followers.length);

  // follow button render logic
  const button = (() => {
    if (auth.userName !== user.userName) {
      if (!followStatus) {
        return (
          <button
            id="profile-header-user-follow"
            onClick={() => handleFollow()}
          >
            Follow
          </button>
        );
      } else {
        return (
          <button
            className="profile-header-user-un-follow"
            onClick={() => handleUnfollow()}
          >
            following
          </button>
        );
      }
    } else {
      return null;
    }
  })();

  // handle follow
  async function handleFollow() {
    setFollowerLen(followerLen + 1);
    setFollowStatus(true);
    try {
      await axios({
        method: "post",
        url: `http://localhost:3001/users/follow`,
        data: { userName: user.userName },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } catch (err) {
      console.error(err);
    }
  }
  // handle Unfollow
  async function handleUnfollow() {
    setFollowerLen(followerLen - 1);
    setFollowStatus(false);
    try {
      await axios({
        method: "post",
        url: `http://localhost:3001/users/unfollow`,
        data: { userName: user.userName },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
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
          {button}
        </div>
        <div className="profile-header-user-followerInfo profile-header-row ">
          <span className="profile-header-user-followerInfo-span">
            <b> {user.posts.length} </b> posts
          </span>
          <span className="profile-header-user-followerInfo-span">
            <b> {followerLen} </b> followers
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

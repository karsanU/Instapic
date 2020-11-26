import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FollowerList from './../followerList/followerList'
import "./header.css";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { updateUser } from "../../../actions/user";
import FollowButton from './../../followButton/FollowButton'

function Header({ user = {}, auth, updateUser }) {
  const [profileAvatarChange, setProfileAvatarChange] = useState(0)
  const [followerLen, setFollowerLen] = useState(user.followers.length);
  const [followerList, setFollowerList] = useState();



  // upload button style
  const useStyles = makeStyles((theme) => ({
    root: {
      "& > *": {
        margin: theme.spacing(1),
      },
    },
    input: {
      display: "none",
    },
  }));
  const classes = useStyles();

  //handle profile picture uploads  
  async function handleProfileUpload(avatar) {
    try {
      const form = new FormData();
      // we append each element to the form
      form.append("image", avatar);
      await axios({
        method: "post",
        url: "http://localhost:3001/users/avatar",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${auth.token}`,
        },
      });
      updateUser(auth)
      setProfileAvatarChange(profileAvatarChange + 1)
    } catch (e) {
      console.log(e)
    }
  }
  // avatar render logic
  const avatar = (() => {
    // user is viewing someone elses profile 
    if (auth.userName !== user.userName) {
      if (user.avatar) {
        return <>
          { // eslint-disable-next-line jsx-a11y/alt-text
            <img
              src={`http://localhost:3001/users/avatar/${user._id}`}
            ></img>
          }
        </>
      }
      else {
        return <Avatar id="profile-header-avatar" />
      }
      // user is viewing someone own profile 
    } else {
      console.log(profileAvatarChange, user._id)
      return (
        <>
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-upload-avatar"
            type="file"
            value=""
            onChange={(e) => {
              handleProfileUpload(e.target.files[0]);
            }}
          />
          <label htmlFor="icon-button-upload-avatar" className="nav-icon-upload-pic">
            <IconButton aria-label="upload picture" component="span">
              {// user already has a profile picture and profile picture change logic
                (profileAvatarChange) ?
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <img key={profileAvatarChange}
                    src={`http://localhost:3001/users/avatar/${user._id}/${new Date().getTime()}`}
                  ></img> :
                  (user.avatar) ?
                    // eslint-disable-next-line jsx-a11y/alt-text
                    <img
                      src={`http://localhost:3001/users/avatar/${user._id}/${new Date().getTime()}`}
                    ></img> :
                    <Avatar id="profile-header-avatar" />
              }
            </IconButton>
          </label>

        </>
      );
    }
  })();

  return (
    <div id="profile-header">
      {followerList
      }
      <div id="profile-header-avatar-container">
        {avatar}
      </div>
      <div id="profile-header-user-info">
        <div className="profile-header-user-username  profile-header-row ">
          <span> {user.name} </span>
          <FollowButton FollowButton auth={auth} user={user}
            setFollowerLen={setFollowerLen}
            followerLen={followerLen} >

          </FollowButton>
        </div>
        <div className="profile-header-user-followerInfo profile-header-row ">
          <span className="profile-header-user-followerInfo-span">
            <b> {user.posts.length} </b> posts
          </span>
          <span
            className="profile-header-user-followerInfo-span pointer"
            onClick={() => setFollowerList(
              <FollowerList user={user} type={'followers'} auth={auth}
                setFollowerLen={setFollowerLen}
                followerLen={followerLen}
                setFollowerList={setFollowerList} />)}
          >
            <b> {followerLen} </b> followers
          </span>
          <span className="profile-header-user-followerInfo-span pointer"
            onClick={() => setFollowerList(
              <FollowerList user={user} type={'following'} auth={auth}
                setFollowerLen={setFollowerLen}
                followerLen={followerLen}
                setFollowerList={setFollowerList} />)}
          >
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


export default connect(null, {
  updateUser,
})(Header);

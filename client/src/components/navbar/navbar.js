import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import logoutAction from "../../actions/logout";
import { updateUser } from "../../actions/user";
import AddAPhotoOutlinedIcon from "@material-ui/icons/AddAPhotoOutlined";
import { makeStyles } from "@material-ui/core/styles";
import Home from "../icons/home";
import Avatar from "@material-ui/core/Avatar";
import { createPost } from "./../../actions/post";
import IconButton from "@material-ui/core/IconButton";
import SearchBar from './../searchBar/SearchBar'
import server, { baseURL } from './../../api/server'
import "./navbar.css";

// testing commit
function Navbar({ auth, logoutAction, createPost, updateUser }) {
  const [profileOptions, setProfileOptions] = useState(null);
  const [usernames, setUsernames] = useState();

  const history = useHistory();
  (() => {
    if (auth.loggedIn === false) {
      history.push("/");
    }
  })();
  // handle logout button click
  function handleOnClickLogout() {
    logoutAction();
  }
  // handle image upload
  async function handleImageUpload(image) {
    try {
      await createPost(image, auth.token);
      alert("image uploaded");
      updateUser(auth);
    } catch {
      alert("Image must be jpg,jpeg or png, as well as less than 5MB.");
    }
  }

  useEffect(() => {
    (async () => {
      try {
        let usernamesTemp = await server({
          method: "get",
          url: `users/usernames`,
        });
        setUsernames(usernamesTemp.data)
      } catch (err) {
        console.log(err)
      }
    })();
  }, []);

  // when the user profile button is clicked on the navbar present options
  function handleOnClickProfileOptions() {
    setProfileOptions(
      <div className="navbar-profile-options-container">
        <div className="navbar-profile-option-triangle"></div>
        <div className="navbar-profile-option">
          <div className="navbar-profile-option-profile-background">
            <div
              className="navbar-profile-option-profile"
              onClick={() => {
                setProfileOptions(null)
                history.push(`/user/${auth.userName}`);
              }}
            >
              Profile
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
  return (
    <div id="navbar">
      {profileOptions !== null ? (
        <div
          className="profile-options-background"
          onClick={() => {
            setProfileOptions(null);
          }}
        ></div>
      ) : null}
      <div id="navItems-container">
        <h1 id="appName">
          <Link to="/feed"> InstaPic </Link>
        </h1>
        {usernames ? <SearchBar usernames={usernames} auth={auth}></SearchBar> : null}
        <div id="nav-iconContainer">
          <input
            accept="image/*"
            className={classes.input}
            id="icon-button-file"
            type="file"
            value=""
            onChange={(e) => {
              handleImageUpload(e.target.files[0]);
            }}
          />
          <label htmlFor="icon-button-file" >
            <IconButton aria-label="upload picture" component="span">
              <AddAPhotoOutlinedIcon style={{ fontSize: 27 }} />
            </IconButton>
          </label>

          <Link to="/feed">
            <IconButton >
              <Home cssclassName="nav-icon" />
            </IconButton>
          </Link>

          <IconButton onClick={(e) => {
            handleOnClickProfileOptions();
          }}>
            {auth.hasAvatar ?
              // eslint-disable-next-line jsx-a11y/alt-text
              <img className="navbar-profile-picture"
                src={`${baseURL}users/avatar/${auth._id}/${new Date().getTime()}`}
              ></img>
              : <Avatar
                id="navbar-profile-icon"

              ></Avatar>}
          </IconButton>


        </div>
      </div>
      {profileOptions}
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {
  logoutAction,
  createPost,
  updateUser,
})(Navbar);
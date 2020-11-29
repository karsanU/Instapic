import React from "react";
import "./sildebarProfile.css";
import { baseURL } from './../../../../api/server'
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { Link } from "react-router-dom";
import { connect } from "react-redux";


function Sidebar_profile({ auth }) {
  return (
    <div id="sidebar_profile">

      <Link to={`/user/${auth.userName}`}>
        <IconButton size="small" >
          {auth.hasAvatar ?
            <img className="sidebar-profile-pic-img"
              src={`${baseURL}users/avatar/${auth._id}/${new Date().getTime()}`}
              alt="feed-sidebar-profile-img"
            ></img>
            : <Avatar id="sidebar_profile-pic" />
          }
        </IconButton>
      </Link>
      <div id="sidebar_profile-info">
        <Link to={`/user/${auth.userName}`}>
          <div>
            <span>
              <b> {auth.userName} </b>
            </span>
          </div>
        </Link>
        <div id="sidebar_profile-nameOfUser">
          <span> {auth.name}</span>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Sidebar_profile);

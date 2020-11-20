import React from "react";
import { connect } from "react-redux";
import "./sildebarProfile.css";
import Avatar from "@material-ui/core/Avatar";

function Sidebar_profile({ auth }) {
  return (
    <div id="sidebar_profile">
      <Avatar id="sidebar_profile-pic" />
      <div id="sidebar_profile-info">
        <div>
          <span>
            <b> {auth.userName} </b>
          </span>
        </div>
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

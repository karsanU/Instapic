import React from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Post from "../post/post";
import FeedSidebar from "./FeedSidebar/FeedSidebar";
import "./feed.css";

function Feed({ auth }) {
  const history = useHistory();
  (() => {
    if (auth.loggedIn === false) {
      history.push("/");
    }
  })();

  return (
    <div id="feed">
      <div id="listOfPosts">
        <Post />
        <Post />
      </div>
      <FeedSidebar />
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Feed);

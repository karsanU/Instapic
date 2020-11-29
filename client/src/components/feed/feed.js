import React, { useState, useEffect } from "react";
import server from './../../api/server'
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import Post from "../post/post";
import FeedSidebar from "./FeedSidebar/FeedSidebar";
import "./feed.css";

function Feed({ auth }) {
  const [posts, setPosts] = useState(null);
  const history = useHistory();
  if (auth.loggedIn === false) {
    history.push("/");
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await server({
          method: "get",
          url: `users/feed`,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setPosts(res.data);
      } catch (err) { }
    })();
  }, [auth.token, auth.posts.length]);

  // render posts
  return (
    <div id="feed">
      <div id="listOfPosts">
        {posts !== null
          ? posts.map((post) => (
            <Post key={post._id} id={post._id} auth={auth}></Post>
          ))
          : null}
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

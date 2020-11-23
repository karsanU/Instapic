import React from "react";
import "./likes.css";

function Likes({ post }) {
  return (
    <p id="likes">
      Liked by <b> {post.likes.length} </b> users 
    </p>
  );
}

export default Likes;

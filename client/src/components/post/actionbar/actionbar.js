import React, { useState } from "react";
import server from './../../../api/server'
import "./actionBar.css";
import Like from "../../icons/like";
import Liked from "../../icons/liked";

function ActionBar({ post, auth, setPost }) {
  const [like, setLike] = useState(post.likes.includes(auth._id));

  async function handleLike() {
    const postCopy = { ...post };
    postCopy.likes.push(auth._id);
    setLike(true);
    setPost(postCopy);
    try {
      await server({
        method: "post",
        url: `posts/like`,
        data: { _id: post._id },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }
  async function handleUnLike() {
    const postCopy = { ...post };
    postCopy.likes.splice(postCopy.likes.indexOf(auth._id), 1);
    setLike(false);
    setPost(postCopy);
    try {
      await server({
        method: "post",
        url: `posts/unlike`,
        data: { _id: post._id },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
    } catch (e) {
      console.log(e);
    }
  }

  function renderLikeJSX() {
    if (like) {
      return (
        <div onClick={() => handleUnLike()}>
          <Liked cssclassName="actionBar-icon" width={25} height={25} />
        </div>
      );
    } else {
      return (
        <div onClick={() => handleLike()}>
          <Like cssclassName="actionBar-icon" width={25} height={25} />
        </div>
      );
    }
  }
  return (
    <div id="actionBar">
      {renderLikeJSX()}
      {
        // <Comment cssclassName="actionBar-icon " />
        // <Bookmark cssclassName="actionBar-icon actionBar-lastIcon" />
      }
    </div>
  );
}

export default ActionBar;

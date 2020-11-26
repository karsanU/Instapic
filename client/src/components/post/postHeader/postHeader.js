import React, { useState } from "react";
import "./postHeader.css";
import PostOptions from "./../postOptions/postOptions";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { Link } from "react-router-dom";

function PostHeader({ post }) {
  const [postOption, setPostOption] = useState(null);
  const [removeImage, setRemoveImage] = useState('');

  function handleOnClick(e) {
    setPostOption(
      <div id="post-options-background" onClick={() => setPostOption(null)}>
        <PostOptions onClick={() => setPostOption(null)}></PostOptions>
      </div>
    );
  }

  return (
    <div id="post-header">
      {postOption}
      <Link to={`/user/${post.userName}`}>
        <img className={`post-header-profile-pic ${removeImage}`}
          src={`http://localhost:3001/users/avatar/${post.user}/${new Date().getTime()}`}
          alt=""
          onError={() => { setRemoveImage('post-header-profile-pic-hidden') }}
        ></img>
        <div className="post-header-profile-placeholder">
          <Avatar id="post-header-profile-placeholder-avatar"></Avatar></div>
      </Link>

      <Link to={`/user/${post.userName}`}>  <span id="post-header-profileName">
        <b>{post.userName}</b>
      </span></Link>



      <MoreHorizIcon
        id="post-header-MoreHorizIcon"
        onClick={(e) => handleOnClick(e)}
      />
    </div>
  );
}

export default PostHeader;

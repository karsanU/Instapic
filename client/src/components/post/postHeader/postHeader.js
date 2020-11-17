import React, { useState } from "react";
import "./postHeader.css";
import PostOptions from "./../postOptions/postOptions";
import Avatar from "@material-ui/core/Avatar";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

function PostHeader() {
  const [postOption, setPostOption] = useState(null);
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
      <Avatar id="post-header-profile" />
      <span id="post-header-profileName">
        <b>karxan_</b>
      </span>
      <MoreHorizIcon
        id="post-header-MoreHorizIcon"
        onClick={(e) => handleOnClick(e)}
      />
    </div>
  );
}

export default PostHeader;

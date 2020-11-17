import React from "react";
import "./postOptions.css";

function PostOptions({ onClick }) {
  return (
    <div
      id="post-options-box"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="post-option post-option-critical">
        <span> Report</span>
      </div>
      <div className="post-option post-option-critical">
        <span> Unfollow </span>
      </div>
      <div className="post-option">
        <span>Go to post </span>
      </div>
      <div className="post-option post-option-end ">
        <span> Cancel</span>
      </div>
    </div>
  );
}

export default PostOptions;

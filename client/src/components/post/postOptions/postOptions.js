import React from "react";
import useEffect from "react";
import "./postOptions.css" 

function PostOptions() {
 
  return (
    <div id="post-options-background">
      <div id="post-options-box">
        <div class="post-option post-option-critical">
          <span> Report</span>
        </div>
        <div class="post-option post-option-critical">
          <span> Unfollow </span>
        </div>
        <div class="post-option">
          <span>Go to post </span>
        </div>
        <div class="post-option post-option-end ">
          <span> Cancel</span>
        </div>
      </div>
    </div>
  );
}

export default PostOptions;

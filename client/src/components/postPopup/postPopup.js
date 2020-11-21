import React from "react";
import "./postPopup.css";
import PostHeader from "./../post/postHeader/postHeader";
import ActionBar from "./../post/actionBar/actionbar";
import Likes from "./../post/likes/likes";
import CommentPostbox from "./../post/commentPostbox/commentPostbox";

function PostPopup() {
  return (
    <div className="post-popup-container">
      <div className="post-popup-post-container">
        <div className="post-popup-post-picture"></div>
        <div className="post-popup-post-rest">
          <PostHeader />
          <div className="commentPreview CommentFull">
            <div className="commentPreview-comment ">
              <span>
                <b>sarah__o__22 </b> @lexfridman single malts, or...? I like
                Laphroaig for cold nights. Warms the heart, cools the mind.
              </span>
            </div>
            <div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div>
            <div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div>
            <div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div>
            <div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div>
            <div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div>
            <div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div><div className="commentPreview-comment  ">
              <span>
                <b>momlearningonthejob</b> One of my favorite authors‼️
              </span>
            </div>  
            <div className="commentPreview-comment  commentPreview-timePosted"></div>
          </div>
          <ActionBar />
          <Likes />

          <CommentPostbox className="comment-post-fix" />
        </div>
      </div>
    </div>
  );
}

export default PostPopup;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./postPopup.css";
import PostHeader from "./../post/postHeader/postHeader";
import ActionBar from "./../post/actionBar/actionbar";
import Likes from "./../post/likes/likes";
import CommentPostbox from "./../post/commentPostbox/commentPostbox";
import CommentPreview from "./../post/commentPreview/commentPreview";

function PostPopup({ id, auth }) {
  const [post, setPost] = useState();

  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:3001/posts/${id}`,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setPost(res.data);
      } catch (err) { }
    })();
  }, []);

  return (
    <div className="post-popup-container">
      <div className="post-popup-post-container">
        <div className="post-popup-post-picture"></div>
        <div className="post-popup-post-rest">
          {post ? (
            <>
              {" "}
              <PostHeader />
              <div className="post-popup-post-rest-comments">
                {post.comments.map((comment) => {
                  return (
                    <div key={comment._id} className="commentPreview-comment">
                      <div>
                        <b>{comment.userName} </b>
                        {comment.text}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="post-popup-post-rest-like-container">
                <ActionBar post={post} auth={auth} setPost={setPost} />

                <Likes post={post} />
              </div>                <CommentPostbox post={post} auth={auth} setPost={setPost} />

            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PostPopup;

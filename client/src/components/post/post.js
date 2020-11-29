import React, { useState, useEffect } from "react";
import server from './../../api/server'
import PostHeader from "./postHeader/postHeader";
import PostPicture from "./postPicture/postPicture";
import ActionBar from "./actionBar/actionbar";
import Likes from "./likes/likes";
import CommentPreview from "./commentPreview/commentPreview";
import CommentPostbox from "./commentPostbox/commentPostbox";

import "./post.css";

const Post = ({ id, auth }) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await server({
          method: "get",
          url: `posts/${id}`,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setPost(res.data);
      } catch (err) { }
    })();
  }, []);


  return (
    <>
      {post !== null ? (
        <div id="post">
          <PostHeader post={post} auth={auth} />
          <PostPicture auth={auth} id={id} />
          <div className="post-like-container">
            <ActionBar post={post} auth={auth} setPost={setPost} />
            <Likes post={post} />
          </div>
          <CommentPreview
            post={post}
            postComments={post.comments}
            setPost={setPost}
            auth={auth}
          />
          <CommentPostbox post={post} auth={auth} setPost={setPost} />
        </div>
      ) : null}
    </>
  );


};

export default Post;

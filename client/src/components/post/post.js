import React, { useState, useEffect } from "react";
import axios from "axios";
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
        const res = await axios({
          method: "get",
          url: `http://localhost:3001/posts/${id}`,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setPost(res.data);
      } catch (err) {}
    })();
  }, []);
  return (
    <div id="post">
      {post !== null ? (
        <>
          <PostHeader />
          <PostPicture auth={auth} id={id} />
          <ActionBar post={post} auth={auth} setPost={setPost} />
          <Likes post={post} />
          <CommentPreview />
          <CommentPostbox />
        </>
      ) : null}
    </div>
  );
};

export default Post;

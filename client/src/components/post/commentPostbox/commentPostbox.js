import React, { useState } from "react";
import server from './../../../api/server'
import "./commentPostbox.css";

function CommentPostbox({ auth, post, setPost }) {
  const [comment, setComment] = useState("");
  async function handleCommentInput(e) {
    e.preventDefault();

    if (comment !== "") {
      setComment("");
      const res = await server({
        method: "post",
        url: "comment/create",
        data: { comment, postId: post._id },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const postCopy = { ...post };
      postCopy.comments.push(res.data);
      setPost(postCopy);
    }
  }

  return (
    <div className="commentPostbox">
      <form className="commentPostbox-form" onSubmit={(e) => handleCommentInput(e)}>
        <input
          autoComplete="off"
          value={comment}
          type="text"
          className="commentPostbox-input"
          name="fname"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" className="commentPostbox-submit" style={comment === '' ? { color: '#8e8e8e' } : null} value="Post" />
      </form>
    </div>
  );
}

export default CommentPostbox;

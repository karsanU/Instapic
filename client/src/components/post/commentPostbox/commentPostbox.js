import React, { useState } from "react";
import axios from "axios";
import "./commentPostbox.css";

function CommentPostbox({ auth, post, setPost }) {
  const [comment, setComment] = useState("");
  async function handleCommentInput(e) {
    e.preventDefault();

    if (comment !== "") {
      setComment("");
      const res = await axios({
        method: "post",
        url: "http://localhost:3001/comment/create",
        data: { comment, postId: post._id },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(res);
      const postCopy = { ...post };
      postCopy.comments.push(res.data);
      setPost(postCopy);
    }
  }

  return (
    <div id="commentPostbox">
      <form id="commentPostbox-form" onSubmit={(e) => handleCommentInput(e)}>
        <input
          autocomplete="off"
          value={comment}
          type="text"
          id="commentPostbox-input"
          name="fname"
          placeholder="Add a comment..."
          onChange={(e) => setComment(e.target.value)}
        />
        <input type="submit" id="commentPostbox-submit" value="Post" />
      </form>
    </div>
  );
}

export default CommentPostbox;

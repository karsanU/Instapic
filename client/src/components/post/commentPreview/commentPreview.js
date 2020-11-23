import React, { useState, useEffect } from "react";
import "./commentPreview.css";

function CommentPreview({ postComments }) {
  const [comments, setComments] = useState(
    postComments.slice(Math.max(postComments.length - 5, 0))
  );

  useEffect(() => {
    console.log("hey");
    if (comments.length < 6) {
      setComments(postComments.slice(Math.max(postComments.length - 5, 0)));
    }
  }, [comments.length, postComments, postComments.length]);

  function renderViewAllJSX() {
    if (postComments.length < 6) {
      return null;
    } else if (postComments.length > 5 && comments.length === 5) {
      return (
        <div
          onClick={() => setComments(postComments)}
          className="commentPreview-comment commentPreview-viewAll"
        >
          view all {postComments.length} comments
        </div>
      );
    } else {
      return (
        <div
          onClick={() =>
            setComments(
              postComments.slice(Math.max(postComments.length - 5, 0))
            )
          }
          className="commentPreview-comment commentPreview-viewAll"
        >
          collapse comments
        </div>
      );
    }
  }

  return (
    <div id="commentPreview" key={postComments.length}>
      {renderViewAllJSX()}
      {comments.map((comment) => {
        return (
          <div key={comment._id} className="commentPreview-comment">
            <span>
              <b>{comment.userName} </b>
              {comment.text}
            </span>
          </div>
        );
      })}

      <div className="commentPreview-comment  commentPreview-timePosted">
        <span>4 DAYS AGO</span>
      </div>
    </div>
  );
}

export default CommentPreview;

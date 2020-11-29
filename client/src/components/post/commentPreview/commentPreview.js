import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./commentPreview.css";
import axios from 'axios'
import CloseIcon from '@material-ui/icons/Close';

function CommentPreview({ postComments, auth, post, setPost }) {
  const [comments, setComments] = useState(
    postComments.slice(Math.max(postComments.length - 5, 0))
  );

  useEffect(() => {
    // logic of expanding to see all comments 
    if (comments.length < 6) {
      setComments(postComments.slice(Math.max(postComments.length - 5, 0)));
    }
  }, [comments.length, postComments, postComments.length]);

  // handle comment delete
  async function handleCommentDelete(comment) {
    try {
      await axios({
        method: "post",
        url: "http://localhost:3001/comments/delete",
        data: { comment },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const tempPost = { ...post }
      tempPost.comments = tempPost.comments.filter((item) => {
        return (item._id !== comment._id)
      })
      console.log(tempPost)
      setPost(tempPost)
      setComments(tempPost.comments)
    } catch {

    }
  }
  // render the comments 
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
    <div id="commentPreview" >
      {renderViewAllJSX()}
      <div id="commentPreview-comments" >
        {comments.map((comment) => {
          return (
            <div key={comment._id} className="commentPreview-comment">
              <span>
                <Link to={`/user/${comment.userName}`}>
                  <b>{comment.userName} </b>
                </Link>
                {comment.text}
              </span>
              {comment.user === auth._id
                ? <CloseIcon
                  onClick={() => handleCommentDelete(comment)}
                  className='comment-preview-comment-delete'
                  style={{ fontSize: 10 }}></CloseIcon>
                : null}
            </div>
          );
        })}
      </div>

      <div className="commentPreview-comment  commentPreview-timePosted">
        <span>4 DAYS AGO</span>
      </div>
    </div>
  );
}
export default CommentPreview;

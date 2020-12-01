import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./commentPreview.css";
import server from './../../../api/server'
import CloseIcon from '@material-ui/icons/Close';

// convert date in to days, weeks, month or year 
function convertDate(date) {
  const diffTime = Math.abs(Date.now() - new Date(date));
  const diffDays = (Math.ceil(diffTime / (1000 * 60 * 60 * 24))) - 1;
  if (diffDays === 0) {
    return 'today'
  } else if (diffDays === 1) {
    return 'yesterday'
  } else if (diffDays < 7) {
    return diffDays + ' days ago'
  } else if (diffDays >= 7 && diffDays < 30) {
    if (Math.floor(diffDays / 7) === 1) { return '1 week ago' }
    return Math.floor(diffDays / 7) + ' weeks ago'
  } else if (diffDays >= 30 && diffDays < 364) {
    if (Math.floor(diffDays / 30) === 1) { return '1 month ago' }
    return Math.floor(diffDays / 30) + ' months ago'
  } else {
    if (Math.floor(diffDays / 364) === 1) { return '1 year ago' }
    return Math.floor(diffDays / 364) + ' years ago'
  }
}


function CommentPreview({ postComments, auth, post, setPost }) {
  const [comments, setComments] = useState(
    postComments.slice(Math.max(postComments.length - 5, 0))
  );

  useEffect(() => {
    // logic of expanding to see all comments and updating upon comment change
    if (comments.length < 6) {
      setComments(postComments.slice(Math.max(postComments.length - 5, 0)));
    }
  }, [comments.length, postComments, postComments.length]);

  // handle comment delete
  async function handleCommentDelete(comment) {
    try {
      await server({
        method: "post",
        url: "comments/delete",
        data: { comment },
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const tempPost = { ...post }
      tempPost.comments = tempPost.comments.filter((item) => {
        return (item._id !== comment._id)
      })
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
        <span>{convertDate(post.time)}</span>
      </div>
    </div>
  );
}
export default CommentPreview;

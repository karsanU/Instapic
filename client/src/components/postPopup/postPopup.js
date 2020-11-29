import React, { useState, useEffect } from "react";
import axios from "axios";
import "./postPopup.css";
import PostHeader from "./../post/postHeader/postHeader";
import ActionBar from "./../post/actionBar/actionbar";
import Likes from "./../post/likes/likes";
import PostPicture from "./../post/postPicture/postPicture";
import CommentPostbox from "./../post/commentPostbox/commentPostbox";
import CloseIcon from '@material-ui/icons/Close';

function PostPopup({ id, auth, setPostPopupJSX }) {
  const [post, setPost] = useState();
  const [postPic, setPostPic] = useState();

  // fetch the post
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
        console.log(res.data)
        setPostPic(<PostPicture postPopUp={true} auth={auth} id={res.data._id}></PostPicture>)
        setPost(res.data);
      } catch (err) { }
    })();
  }, []);


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
    } catch {

    }
  }
  return (
    <div className="post-popup-container" onClick={() => {
      setPostPopupJSX(null)
    }}>

      {post && postPic ? (
        <div onClick={(e) => {
          e.stopPropagation()
        }} className="post-popup-post-container">
          <div className="post-popup-post-picture">
            {postPic}
          </div>
          <div className="post-popup-post-rest">
            <>
              <PostHeader post={post} />
              <div className="post-popup-post-rest-comments">
                {post.comments.map((comment) => {
                  return (
                    <div key={comment._id} className="commentPreview-comment">
                      <div>
                        <b>{comment.userName} </b>
                        {comment.text}
                      </div>
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
              <div className="post-popup-post-rest-like-container">
                <ActionBar post={post} auth={auth} setPost={setPost} />

                <Likes post={post} />
              </div>                <CommentPostbox post={post} auth={auth} setPost={setPost} />

            </>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default PostPopup;

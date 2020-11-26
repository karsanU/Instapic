import React, { useState, useEffect } from "react";
import axios from "axios";
import "./postPopup.css";
import PostHeader from "./../post/postHeader/postHeader";
import ActionBar from "./../post/actionBar/actionbar";
import Likes from "./../post/likes/likes";
import PostPicture from "./../post/postPicture/postPicture";
import CommentPostbox from "./../post/commentPostbox/commentPostbox";
import { TurnedIn } from "@material-ui/icons";

function PostPopup({ id, auth, setPostPopupJSX }) {
  const [post, setPost] = useState();
  const [postPic, setPostPic] = useState();


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

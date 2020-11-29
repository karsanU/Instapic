import React from "react";
import { Link } from "react-router-dom";
import server from './../../../api/server'
import { connect } from "react-redux";
import { updateUser } from "../../../actions/user";
import "./postOptions.css";

function PostOptions({ setPostOption, auth, post, updateUser }) {
  // handle post delete onlClick
  const handlePostDeletion = async () => {
    try {
      await server({
        method: "Post",
        url: `posts/delete`,
        data: post,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      updateUser(auth)
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <div
      id="post-options-box"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {post.user === auth._id
        ?
        <div className="post-option post-option-critical pointer" onClick={() => {
          handlePostDeletion()
          setPostOption(null)
        }}>
          <span> Delete </span>
        </div>
        :
        <> </>
      }
      <Link to={`/user/${post.userName}`}>
        <div className="post-option pointer" onClick={() => { setPostOption(null) }}>
          <span> Profile </span>
        </div>
      </Link>
      <div className="post-option post-option-end pointer" onClick={() => { setPostOption(null) }}>
        <span> Cancel</span>
      </div>
    </div >
  );
}

export default connect(null, {
  updateUser,
})(PostOptions);


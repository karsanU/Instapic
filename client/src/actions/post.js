import server from "./../api/server";
import axios from "axios";

export const fetchPost = (postId) => {
  return {
    type: "FETCH_POST",
    postId,
  };
};

export const clickLike = (postID) => {
  return {
    type: "CLICK_LIKE",
    postID,
  };
};

export const deletePost = (postID) => {
  return {
    type: "DELETE_POST",
    postID,
  };
};

export const createPost = (image, token) => {
  return async function (dispatch, getState) {
    try {
      alert("image uploaded");
      const form = new FormData();
      // we append each element to the form
      form.append("image", image);
      const response = await axios({
        method: "post",
        url: "http://localhost:3001/posts/create",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // server.post("/posts/create", { form }, config);
      console.log(response);
      // dispatch({ type: "USER_LOGGED_IN", userInfo });
    } catch (err) {
      console.error("test", err);
    }
  };
};

export const addComment = (message) => {
  return {
    type: "ADD_COMMENT",
    message,
  };
};

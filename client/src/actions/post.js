import server from "./../api/server";

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
      const form = new FormData();
      // we append each element to the form
      form.append("image", image);
      await server({
        method: "post",
        url: "posts/create",
        data: form,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      return null;
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

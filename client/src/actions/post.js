export const FetchPost = (postId) => {
    return {
        type: "FETCH_POST",
        postId,
    }
}
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

export const createPost = (content) => {
  return {
    type: "CREATE_POST",
    content,
  };
};

export const addComment = (message) => {
  return {
    type: "ADD_COMMENT",
    message,
  };
};

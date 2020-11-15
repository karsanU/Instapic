export const fetchFeed = (postID) => {
  return {
    type: "FETCH_FEED",
    postID,
  };
};

export const fetchProfile = (username) => {
  return {
    type: "FETCH_PROFILE",
    username,
  };
};

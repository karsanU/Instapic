import axios from "axios";

export const updateUser = (auth) => {
  return async function (dispatch, getState) {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:3001/users/updatedUser`, 
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(res.data);
      res.data.posts.reverse();
      setUser(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // return {
  //   type: "FETCH_PROFILE",
  //   username,
  // };
};

export const fetchFeed = (postID) => {
  return {
    type: "FETCH_FEED",
    postID,
  };
};

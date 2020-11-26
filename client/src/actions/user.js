import axios from 'axios';
export function updateUser(auth) {
  return async function (dispatch, getState) {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:3001/users/updatedUser`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      const userInfo = res.data;
      delete userInfo['avatar']
      dispatch({ type: "USER_UPDATED", userInfo });
    } catch (err) {
      console.error(err);
    }
  };
}

export const fetchFeed = (postID) => {
  return {
    type: "FETCH_FEED",
    postID,
  };
};
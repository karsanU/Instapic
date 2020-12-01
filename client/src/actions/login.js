import server from "./../api/server";

export default (credentialsInput) => {
  return async function (dispatch, getState) {
    const credentials = { ...credentialsInput };
    try {
      const response = await server.post("/users/login", credentials);
      const userInfo = response.data.user;
      delete userInfo['avatar']
      dispatch({ type: "USER_LOGGED_IN", userInfo });
    } catch (err) {
    }
  };
};

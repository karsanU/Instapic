import server from "./../api/server";

export default function attemptSignup(credentialsInput) {
  return async function (dispatch, getState) {
    const credentials = { ...credentialsInput };
    try {
      const response = await server.post("/users/create", credentials);
      const userInfo = response.data.user;
      dispatch({ type: "USER_LOGGED_IN", userInfo });
    } catch (err) {
      console.error(err);
    }
  };
}

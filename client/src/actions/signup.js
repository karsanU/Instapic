import server from "./../api/server";

export default function attemptSignup(credentialsInput) {
  return async function (dispatch, getState) {
    console.log(credentialsInput);
    const credentials = { ...credentialsInput };
    try {
      const response = await server.post("/users/create", credentials);
      dispatch({ type: "USER_LOGGED_IN", response });
    } catch (err) {
      const fieldError = err.response.data.keyPattern;
      console.error(err.response.data);
      if ("email" in fieldError) {
        console.error("given e-mail is already in use");
      } else if ("userName" in fieldError) {
        console.error("given username is already in use");
      }
    }
  };
}

export default (credentials) => {
  return {
    type: "ATTEMPT_LOGIN",
    credentials,
  };
};

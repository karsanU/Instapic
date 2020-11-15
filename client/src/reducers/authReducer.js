export default (state = { loggedIn: false }, action) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return { loggedIn: true, ...action.payload };
    case "USER_LOGGED_OUT":
      return { loggedIn: false };
    default:
      return state;
  }
};

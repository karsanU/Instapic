const initialState = { loggedIn: false };
export default (state = initialState, action) => {
  switch (action.type) {
    case "USER_LOGGED_IN":
      return { loggedIn: true, ...action.userInfo };
    case "USER_UPDATED":
      return { ...action.userInfo, loggedIn: true };
    case "USER_LOGGED_OUT":
      return { loggedIn: false };
    default:
      return state;
  }
};

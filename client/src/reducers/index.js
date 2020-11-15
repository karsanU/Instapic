import { combineReducers } from "redux";
import postsReducer from "./postsReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";

export default combineReducers({
  posts: postsReducer,
  users: usersReducer,
  auth: authReducer,
});

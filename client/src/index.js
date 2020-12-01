import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import App from "./components/App";
import reducers from "./reducers";
import server from "./api/server";


// set the persisted data is there is any
const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};
// setup redux store with redux-thunk
const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware));
const reduxStore = createStore(reducers, persistedState, composedEnhancer);

// save the userAuth info to the local storage
reduxStore.subscribe(() => {
  // persist  state
  localStorage.setItem("reduxState", JSON.stringify(reduxStore.getState()));
});
export default reduxStore;


// wake the heroku server as soon as the front end start
(async function () {
  await server({
    method: "get",
    url: "wake",
  });
})()

ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./components/navbar/navbar";
import Feed from "./components/feed/feed";
import PostOptions from "./components/post/postOptions/postOptions";
import Profile from "./components/profile/profile";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import "./App.css";

function App() {
  return (
    // navbar
    <BrowserRouter>
      <div id="containerWholeApp">
        <Route path="/" exact component={Login} />
        <Route path="/login" exact component={Login} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/feed" component={Navbar} />
        <Route path="/feed" exact component={Feed} />
        <Route path="/user" component={Navbar} />
        <Route path="/user" exact component={Profile} />
      </div>
    </BrowserRouter>
  );
}

export default App;

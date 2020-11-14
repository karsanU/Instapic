import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Navbar from "./navbar/navbar";
import Feed from ".//feed/feed";
import Profile from "./profile/profile";
import Login from "./login/login";
import Signup from "./signup/signup";
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

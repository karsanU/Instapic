import React from 'react';
import Navbar from './components/navbar/navbar'
import Feed from './components/feed/feed'
import PostOptions from './components/post/postOptions/postOptions'
import Profile  from './components/profile/profile'
import Login from './components/login/login'
import Signup from './components/signup/signup'
import './App.css';


function App() {
  return (
    // navbar
    <div id = 'containerWholeApp'>
      {/* {<Navbar />} */}
     {/* { <Login />} */}
     <Signup/>
      {/* {<Profile />} */}
      {/* {
      <Feed />} */}
      {/* {<PostOptions />} */}
    </div>
    // conditional rendering 

  );
}

export default App;

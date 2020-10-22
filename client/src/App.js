import React from 'react';
import Navbar from './components/navbar/navbar'
import Feed from './components/feed/feed'
import PostOptions from './components/post/postOptions/postOptions'
import Profile  from './components/profile/profile'
import './App.css';


function App() {
  return (
    // navbar
    <div id = 'containerWholeApp'>
      <Navbar />
      <Profile />
      {/* {
      <Feed />} */}
      {/* {<PostOptions />} */}
    </div>
    // conditional rendering 

  );
}

export default App;

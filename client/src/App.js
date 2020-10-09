import React from 'react';
import Navbar from './components/navbar/navbar'
import Feed from './components/feed/feed'
import './App.css';

function App() {
  return (
    // navbar
    <div id = 'containerWholeApp'>
      <Navbar />
      <Feed />
    </div>
    // conditional rendering 

  );
}

export default App;

import React from 'react'
import './profile.css'
import Header from './header/header'
import UserContent from './user-content/userContent'
function Profile() {
    return (
        <div id = 'profile-container'> 
            <div id = 'profile'>
            <Header />
            <UserContent /> 
         </div>
        </div>
         
    )
}

export default Profile

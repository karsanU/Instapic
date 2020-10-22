import React from 'react'
import './sildebarProfile.css'
import Avatar from '@material-ui/core/Avatar'

function Sidebar_profile() {
    return (
        <div id = "sidebar_profile">
            <Avatar id= 'sidebar_profile-pic'/>
            <div id="sidebar_profile-info">
               <div>
                   <span> <b>Karxan_ </b></span>
               </div>
               <div id="sidebar_profile-nameOfUser">
                    <span> Carson Jujubwe</span>
               </div>
            </div>
        </div>
    )
}

export default Sidebar_profile

import React from 'react'
import './sildebarProfile.css'
import Avatar from '@material-ui/core/Avatar'

function sidebar_profile() {
    return (
        <div id = "sidebar_profile">
            <Avatar id= 'sidebar_profile-pic'/>
            <div id="sidebar_profile-info">
               <div>
                   <span> Karxan_</span>
               </div>
               <div>
                    <span> Carson Jujubwe</span>
               </div>
            </div>
        </div>
    )
}

export default sidebar_profile

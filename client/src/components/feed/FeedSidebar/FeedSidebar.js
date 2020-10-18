import React from 'react'
import SidebarProfile from './sildebarProfile/sildebarProfile'

import './FeedSidebar.css'
function FeedSidebar() {
    return (
        <div class="float-container">
            <div id='sidebar-container'>
                <SidebarProfile />
                <div id='sidebar-userInfo'> </div>
                <div id='sidebar-recommendedToFollow'> </div>
            </div>
        </div>

    )
}

export default FeedSidebar

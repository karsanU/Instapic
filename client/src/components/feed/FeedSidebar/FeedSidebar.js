import React from 'react'
import SidebarProfile from './sildebarProfile/sildebarProfile'
import FollowSuggestions from './followSuggestions/followSuggestions'
import './FeedSidebar.css'
function FeedSidebar() {
    return (
        <div class="float-container">
            <div id='sidebar-container'>
                <SidebarProfile />
                <FollowSuggestions />
            </div>
        </div>

    )
}

export default FeedSidebar

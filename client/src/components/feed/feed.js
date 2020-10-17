import React from 'react'
import Post from '../post/post'
import FeedSidebar from './FeedSidebar/FeedSidebar'
import './feed.css'

function Feed() {
    return (
        <div id="feed">
            <div id='listOfPosts'>
                <Post />
                <Post />
            </div>
            <FeedSidebar />
        </div>
    )
}

export default Feed

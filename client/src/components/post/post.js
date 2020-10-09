import React from 'react'
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';import './post.css'


const Post = () => {
    return (
        <div id='post-container'>
            <div id='post-header'>
                <AccountCircleRoundedIcon id='post-header-profile' />
                <span id='post-header-profileName'> Karsan Uthayakumar </span>
                <MoreHorizIcon  id='post-header-MoreHorizIcon'/>
            </div>
            <div id='post-body'>
            </div>
            <div id='post-footer'></div>
        </div>
    )
}

export default Post


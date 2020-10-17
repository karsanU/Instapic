import React from 'react'
import './postHeader.css'
import Avatar from '@material-ui/core/Avatar';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';  

function PostHeader() {
    return (
        <div id='post-header'>
            <Avatar id='post-header-profile' />
            <span id='post-header-profileName'><b>karxan_</b>  </span>
            <MoreHorizIcon id='post-header-MoreHorizIcon' />
        </div>
    )
}

export default PostHeader

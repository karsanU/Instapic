import React from 'react'
import PostHeader from './postHeader/postHeader'
import PostPicture from './postPicture/postPicture'
import ActionBar from './actionBar/actionBar'
import Likes from './likes/likes'
import CommentPreview from './commentPreview/commentPreview'
import CommentPostbox from './commentPostbox/commentPostbox'


import './post.css'

const Post = () => {
    return (
        <div id='post'>
            <PostHeader />
            <PostPicture />
            <ActionBar />
            <Likes /> 
            <CommentPreview />
            <CommentPostbox />
        </div>
    )
}

export default Post


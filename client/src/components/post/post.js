import React from 'react'
import PostHeader from './postHeader/postHeader'
import PostPicture from './postPicture/postPicture'
import Actionbar from './actionbar/actionbar'
import Likes from './likes/likes'
import CommentPreview from './commentPreview/commentPreview'
import CommentPostbox from './commentPostbox/commentPostbox'



import './post.css'

const Post = () => {
    return (
        <div id='post'>
            <PostHeader />
            <PostPicture />
            <Actionbar />
            <Likes /> 
            <CommentPreview />
            <CommentPostbox />
        </div>
    )
}

export default Post


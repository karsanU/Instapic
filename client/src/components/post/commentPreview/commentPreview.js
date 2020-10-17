import React from 'react'
import './commentPreview.css'

function CommentPreview() {
    return (
        <div id='commentPreview'>

            <div class='commentPreview-comment '>
                <span> <b>karxan_  </b>user's description for the post 👶</span>
            </div>
            <div class='commentPreview-comment '>
                <a href='nah'>View all 11 comments</a>
            </div>
            <div class='commentPreview-comment '>
                <span> <b>sarah__o__22   </b> @lexfridman single malts, or...? I like Laphroaig for cold nights. Warms the heart, cools the mind.</span>
            </div>
            <div class='commentPreview-comment  '>
                <span><b>momlearningonthejob</b> One of my favorite authors‼️</span>
            </div>
            <div class='commentPreview-comment  commentPreview-timePosted'>
                <span>4 DAYS AGO</span>
            </div>
        </div>

    )
}

export default CommentPreview

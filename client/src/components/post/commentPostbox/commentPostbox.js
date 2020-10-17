import React from 'react'
import './commentPostbox.css'
function CommentPostbox() {
    return (
        <div id='commentPostbox'>
            <form id = 'commentPostbox-form'>
                <input type="text" id="commentPostbox-input" name="fname" placeholder="Add a comment..." />
                <input type="submit" id="commentPostbox-submit" value="Post" /> 
            </form>
        </div>
    )
}

export default CommentPostbox

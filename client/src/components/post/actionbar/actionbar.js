import React from 'react'
import './actionBar.css'
import Bookmark from '../../icons/bookmark';
import Heart from '../../icons/heart';
import Comment from '../../icons/comment';

function actionBar() {
    return (
        <div id='actionBar' >
            <Heart cssClass='actionBar-icon' width={25} height={25} />
            <Comment cssClass='actionBar-icon' />
            <Bookmark cssClass='actionBar-icon actionBar-lastIcon' />
        </div>
    )
}

export default actionBar

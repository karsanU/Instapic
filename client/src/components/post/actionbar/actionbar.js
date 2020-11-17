import React from 'react'
import './actionBar.css'
import Bookmark from '../../icons/bookmark';
import Heart from '../../icons/heart';
import Comment from '../../icons/comment';

function actionBar() {
    return (
        <div id='actionBar' >
            <Heart cssclassName='actionBar-icon' width={25} height={25} />
            <Comment cssclassName='actionBar-icon' />
            <Bookmark cssclassName='actionBar-icon actionBar-lastIcon' />
        </div>
    )
}

export default actionBar

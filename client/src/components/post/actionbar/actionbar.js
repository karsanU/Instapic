import React from 'react'
import './actionbar.css'
import Bookmark from '../../icons/bookmark';
import Heart from '../../icons/heart';
import Comment from '../../icons/comment';

function Actionbar() {
    return (
        <div id='actionbar' >
            <Heart cssClass='actionbar-icon' width={25} height={25} />
            <Comment cssClass='actionbar-icon' />
            <Bookmark cssClass='actionbar-icon actionbar-lastIcon' />
        </div>
    )
}

export default Actionbar

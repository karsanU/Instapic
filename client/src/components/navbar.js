import React from 'react'
import './navbar.css'
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import SendIcon from '@material-ui/icons/Send';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import AccountCircleRoundedIcon from '@material-ui/icons/AccountCircleRounded';


function navbar() {
    return (
        <div id='navbar'>
            <input type='text' placeholder='Search' id='search' />
            <div id='nav-iconContainer'>
                <HomeRoundedIcon class='nav-icon'/>
                <SendIcon class='nav-icon' />
                <FavoriteBorder class='nav-icon' />
                <AccountCircleRoundedIcon class='nav-icon' />
            </div>
        </div>
    )
}

export default navbar

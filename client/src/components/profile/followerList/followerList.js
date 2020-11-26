import React, { useState, useEffect } from "react";
import axios from "axios";
import "./followerList.css";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import FollowButton from './../../followButton/FollowButton'

function FollowerList({ auth, user, setFollowerLen, followerLen, type, setFollowerList }) {
    const [followerListJSX, setFollowerListJSX] = useState([])
    // fetch a fans info 
    async function fetchFan(fan_id) {
        try {
            const fan = await axios({
                method: "get",
                url: `http://localhost:3001/users/fetch/basic/${fan_id}`,
            });
            return fan
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        (async () => {
            user[type].map(async (fan_id) => {
                const fan = (await fetchFan(fan_id)).data
                const result = <div className="each-fan-container">
                    <div className="each-fan-profile-pic-info">
                        <Link to={`/user/${fan.userName}`}>
                            <IconButton  >
                                {fan.hasAvatar ?
                                    <img className="sidebar-profile-fan"
                                        src={`http://localhost:3001/users/avatar/${fan_id}/${new Date().getTime()}`}
                                        alt="feed-sidebar-profile-img"
                                    ></img>
                                    : <Avatar id="sidebar-profile-fan-default" />
                                }
                            </IconButton>
                        </Link>
                        <div>
                            <b> {fan.userName} </b>
                            <br  /> {fan.name}
                        </div>
                    </div>

                    <div>
                        <FollowButton FollowButton auth={auth} user={user}
                            setFollowerLen={setFollowerLen}
                            followerLen={followerLen} >
                        </FollowButton>
                    </div>
                </div>
                setFollowerListJSX((followerListJSX) => [...followerListJSX, result])
            })
        })();
    }, []);


    return (
        <div className="follower-list-background" onClick={() => setFollowerList(null)}>
            <div className="follower-list-container">
                <div className="follower-list-container-title">
                    <b> {type === "following" ? "Following" : "Followers"}</b>
                </div>
                {followerListJSX}
            </div>
        </div >
    );
}
export default FollowerList;

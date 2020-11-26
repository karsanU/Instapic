import React, { useState } from 'react'
import axios from 'axios'
import './followButton.css'

function FollowButton({ auth, user, setFollowerLen, followerLen }) {
    const [followStatus, setFollowStatus] = useState(
        user.followers.includes(auth._id)
    ); 
    // follow button render logic
    const button = (() => {
        if (auth.userName !== user.userName) {
            if (!followStatus) {
                return (
                    <button
                        className="profile-header-user-follow pointer"
                        onClick={() => handleFollow()}
                    >
                        follow
                    </button>
                );
            } else {
                return (
                    <button
                        className="profile-header-user-un-follow pointer"
                        onClick={() => handleUnfollow()}
                    >
                        following
                    </button>
                );
            }
        } else {
            return null;
        }
    })();

    // handle follow
    async function handleFollow() {
        setFollowerLen(followerLen + 1);
        setFollowStatus(true);
        try {
            await axios({
                method: "post",
                url: `http://localhost:3001/users/follow`,
                data: { userName: user.userName },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
        } catch (err) {
            console.error(err);
        }
    }
    // handle Unfollow
    async function handleUnfollow() {
        setFollowerLen(followerLen - 1);
        setFollowStatus(false);
        try {
            await axios({
                method: "post",
                url: `http://localhost:3001/users/unfollow`,
                data: { userName: user.userName },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div >
            {button}
        </div>
    )
}

export default FollowButton

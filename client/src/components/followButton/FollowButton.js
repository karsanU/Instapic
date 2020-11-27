import React, { useState } from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import './followButton.css'
import { updateUser } from "../../actions/user";

function FollowButton({ auth, user, updateUser }) {
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
        updateUser(auth)
    }
    // handle Unfollow
    async function handleUnfollow() {

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
        updateUser(auth)
    }
    return (
        <div >
            {button}
        </div>
    )
}
export default connect(null, {
    updateUser,
})(FollowButton);

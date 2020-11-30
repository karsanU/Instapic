import React, { useState } from 'react'
import { connect } from "react-redux";
import server from './../../api/server'
import './followButton.css'
import { updateUser } from "../../actions/user";
import loadingSmall from "./../icons/loading-small.svg";


function FollowButton({ auth, user, updateUser, setUser }) {
    const [followStatus, setFollowStatus] = useState(
        user.followers.includes(auth._id)
    );
    const [loading, setLoading] = useState(false);
    const loadingBackground = {
        backgroundImage: `url(${loadingSmall}) `,
        backgroundRepeat: ' no-repeat',
        backgroundSize: '28px 28px',
        backgroundPosition: 'left -2px top 0px'
    }
    // follow button render logic
    const button = (() => {

        if (auth.userName !== user.userName) {
            if (followStatus === "loading") {
                return (
                    <button
                        className="profile-header-user-follow pointer"
                        onClick={() => handleFollow()}
                    >
                        follow
                    </button>
                );
            }
            if (!followStatus) {
                return (
                    <button
                        style={loading ? loadingBackground : null}
                        className="profile-header-user-follow pointer"
                        onClick={() => handleFollow()}
                    >
                        follow
                    </button>
                );
            } else {
                return (
                    <button
                        style={loading ? loadingBackground : null}
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
        setLoading(true)
        try {
            await server({
                method: "post",
                url: `users/follow`,
                data: { userName: user.userName },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

        } catch (err) {
            console.error(err);
        }
        updateUser(auth)
        setLoading(false)
        setFollowStatus(true);

    }
    // handle Unfollow
    async function handleUnfollow() {
        setLoading(true)
        try {
            await server({
                method: "post",
                url: `users/unfollow`,
                data: { userName: user.userName },
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            });

        } catch (err) {
            console.error(err);
        }
        updateUser(auth)
        setLoading(false)
        setFollowStatus(false);
    }
    return (
        <>
            { button}
        </>
    )
}
export default connect(null, {
    updateUser,
})(FollowButton);

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './followSuggestions.css'
import Avatar from '@material-ui/core/Avatar';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import IconButton from "@material-ui/core/IconButton";


function FollowSuggestions({ auth }) {
    const [resultJSX, setResultJSX] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const users = await axios({
                    method: "get",
                    url: `http://localhost:3001/users/recent_signup`,
                    headers: {
                        Authorization: `Bearer ${auth.token}`,
                    },
                });
                console.log(users)
                const jsx = []
                users.data.forEach((user) => {
                    jsx.push(<div key={user._id} id='followSuggestions-profiles'>
                        <Link to={`/user/${user.userName}`}>
                            <IconButton size="small" >
                                {user.hasAvatar ?
                                    <img id="followSuggestions-profiles-picture"
                                        src={`http://localhost:3001/users/avatar/${user._id}/${new Date().getTime()}`}
                                        alt="suggested profile"
                                    ></img>
                                    : <Avatar id='followSuggestions-profiles-avatar' />
                                }
                            </IconButton>
                        </Link>
                        <div id="followSuggestions-profiles-info">
                            <div id='followSuggestions-profiles-username'>
                                <Link to={`/user/${user.userName}`}>
                                    <span> <b> {user.userName} </b></span>
                                </Link>
                            </div>
                            <div id='followSuggestions-profiles-relation'>
                                <span> New to Instapic </span>
                            </div>
                        </div>
                        <div id='followSuggestions-profiles-follow'>
                            <Link to={`/user/${user.userName}`}>
                                <span>   Follow   </span>
                            </Link>

                        </div>
                    </div>)
                })
                setResultJSX([...resultJSX, jsx])

            } catch (err) { console.log(err) }
        })();
    }, []);


    return (
        <div id='followSuggestions-container'>
            <div id='followSuggestions-title'>
                <b> <span> Suggestions  </span></b>
            </div>
            {resultJSX}
        </div>
    )
}
const mapStateToProps = (state /*, ownProps*/) => {
    return {
        auth: state.auth,
    };
};
export default connect(mapStateToProps)(FollowSuggestions);


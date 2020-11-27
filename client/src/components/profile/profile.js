import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./profile.css";
import Header from "./header/header";
import UserContent from "./user-content/userContent";
import axios from "axios";

function Profile({ auth, match }) {
  const history = useHistory();
  if (auth.loggedIn === false) {
    history.push("/");
  }
  const [user, setUser] = useState({ followers: [], following: [] });
  const [contentNotHere, setContentNotHere] = useState(true);
  const [username, setUsername] = useState(match.params.id);

  console.log(username);
  if (username !== match.params.id) {
    setUsername(match.params.id);
  }
  // if the user is logged out got to login

  // get the profile
  useEffect(() => {
    (async () => {
      console.log("getting the user");
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:3001/users/fetch/${username}`,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log(res.data);
        setUser({ ...res.data });
        setContentNotHere(false)
      } catch (err) {
        console.error(err);
      }
    })();
  }, [auth, username]);


  return (
    <div key={user._id} id="profile-container">
      <div id="profile">
        {contentNotHere ? null : (
          <>
            <Header user={user} auth={auth} setUser={setUser} />
            <UserContent
              username={username}
              user={user}
              auth={auth}
            />
          </>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, {})(Profile);

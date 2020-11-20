import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import "./profile.css";
import Header from "./header/header";
import UserContent from "./user-content/userContent";
import axios from "axios";

function Profile({ auth, match }) {
  const [user, setUser] = useState(undefined);
  console.log(match);
  const username = match.params.id;
  // if the user is logged out got to login
  const history = useHistory();
  (() => {
    if (auth.loggedIn === false) {
      history.push("/");
    }
  })();
  // get the profile
  useEffect(() => {
    (async () => {
      try {
        const res = await axios({
          method: "get",
          url: `http://localhost:3001/users/fetch/${username}`,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        console.log(res.data);
        res.data.posts.reverse();
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div id="profile-container">
      <div id="profile">
        {user === undefined ? null : (
          <>
            <Header user={user} auth={auth} />
            <UserContent user={user} auth={auth} />
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

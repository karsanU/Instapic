import React, { useEffect, useState } from "react";
import axios from "axios";
import "./userContent.css";
function UserContent({ user, auth }) {
  const [photoJsx, setPhotoJsx] = useState([]);
  const totalRows = Math.ceil(user.posts.length / 3);
  // get all the photos rendered
  async function getPicture(id) {
    try {
      const res = await axios({
        method: "get",
        url: `http://localhost:3001/posts/picture/${id}`,
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
        responseType: "arraybuffer",
      });
      const b64Response = Buffer.from(res.data, "binary").toString("base64");

      return "data:image/png;base64, " + b64Response;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let result;

    (async () => {
      try {
        for (let i = 0; i < totalRows; i++) {
          if (user.userName === auth.userName) {
            user = auth;
          }
          result = (
            <div key={user.posts.length + i} className="userContent-row">
              {user.posts[i * 3 + 0] !== undefined ? (
                <div className="userContent-item1 userContent-item">
                  <img
                    src={await getPicture(user.posts[i * 3 + 0])}
                    alt="postImage"
                  ></img>
                </div>
              ) : null}
              {user.posts[i * 3 + 1] !== undefined ? (
                <div className="userContent-item2 userContent-item">
                  <img
                    src={await getPicture(user.posts[i * 3 + 1])}
                    alt="postImage"
                  ></img>
                </div>
              ) : (
                <div className="userContent-item2 userContent-item"></div>
              )}
              {user.posts[i * 3 + 2] !== undefined ? (
                <div className="userContent-item3 userContent-item">
                  <img
                    src={await getPicture(user.posts[i * 3 + 2])}
                    alt="postImage"
                  ></img>
                </div>
              ) : (
                <div className="userContent-item3 userContent-item"></div>
              )}
            </div>
          );
          setPhotoJsx((photoJsx) => [...photoJsx, result]);
        }
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="main-userContent-row" key={user.posts.length}>
      {photoJsx}
    </div>
  );
}

export default UserContent;

import React, { useEffect, useState } from "react";
import PostPopup from './../../postPopup/postPopup'
import server from '../../../api/server'
import "./userContent.css";
function UserContent({ user, auth }) {
  const [photoJsx, setPhotoJsx] = useState([]);
  const [postPopupJSX, setPostPopupJSX] = useState(<> </>)
  const totalRows = Math.ceil((user.posts.length + 1) / 3);

  // render the pop up post 
  function handlePostExpansion(id) {
    setPostPopupJSX(<PostPopup id={id} auth={auth} setPostPopupJSX={setPostPopupJSX} />)
  }

  // get all the photos rendered
  async function getPicture(id) {
    try {
      const res = await server({
        method: "get",
        url: `posts/picture/${id}`,
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
                <div onClick={() => handlePostExpansion(user.posts[i * 3 + 0])} className="userContent-item1 userContent-item">
                  <img
                    src={await getPicture(user.posts[i * 3 + 0])}
                    alt="post"
                  ></img>
                </div>
              ) : null}
              {user.posts[i * 3 + 1] !== undefined ? (
                <div onClick={() => handlePostExpansion(user.posts[i * 3 + 1])} className="userContent-item2 userContent-item">
                  <img
                    src={await getPicture(user.posts[i * 3 + 1])}
                    alt="post"
                  ></img>
                </div>
              ) : (
                  <div className="userContent-item2 userContent-item"></div>
                )}
              {user.posts[i * 3 + 2] !== undefined ? (
                <div onClick={() => handlePostExpansion(user.posts[i * 3 + 2])} className="userContent-item3 userContent-item">
                  <img
                    src={await getPicture(user.posts[i * 3 + 2])}
                    alt="post"
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
      {postPopupJSX}
      {photoJsx}
    </div>
  );
}

export default UserContent;

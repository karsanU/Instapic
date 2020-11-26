import React, { useState, useEffect } from "react";
import axios from "axios";
import "./postPicture.css";
import loading from "./../../icons/loading.svg";
function PostPicture({ postPopUp, auth, id }) {
  const [image, setImage] = useState();
  useEffect(() => {
    if (auth !== undefined) {
      (async function () {
        const res = await axios({
          method: "get",
          url: `http://localhost:3001/posts/picture/${id}`,
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
          responseType: "arraybuffer",
        });
        const b64Response = Buffer.from(res.data, "binary").toString("base64");

        setImage("data:image/png;base64, " + b64Response);
      })();
    }
  }, []);
  return (
    <div id={postPopUp ? "post-picture-popup" : "post-picture"}>
      {postPopUp
        ?
        <img src={image} alt="user's post"></img>
        :
        <img src={image || loading} alt="user's post"></img>}
    </div>
  );
}

export default PostPicture;

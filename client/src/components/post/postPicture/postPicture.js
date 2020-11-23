import React, { useState, useEffect } from "react";
import axios from "axios";
import "./postPicture.css";
import loading from "./../../icons/loading.svg";
function PostPicture({ auth, id }) {
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
    <div id="post-picture">
      {<img src={image || loading} alt="postImage"></img>}
    </div>
  );
}

export default PostPicture;

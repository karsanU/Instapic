const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const Post = require("../models/post");
const auth = require("../middleware/auth");

const router = new express.Router();

// POST
// Upload a picture

const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      console.log("file", file);
      cb(new Error("Image upload file is not compatible"));
    }
    cb(undefined, true);
  },
});

// create a post
router.post(
  "/posts/create",
  auth,
  upload.single("image"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer).png().toBuffer();
    const post = new Post({ user: req.user });
    post.picture = buffer;
    await post.save();
    req.user.posts.push(post);
    await req.user.save();
    res.send(200);
  },
  (e, req, res, next) => {
    console.log(e);
    res.status(400).send({ error: e.message });
  }
);

// get the img src of a file given the post _id
router.get("/posts/picture/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || !post.picture) {
      throw new Error();
    }
    res.set("Content-Type", "image/png");
    res.send(post.picture);
  } catch (e) {
    res.status(404).send(e);
  }
});
module.exports = router;

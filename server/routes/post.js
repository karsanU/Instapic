const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const Post = require("../models/post");
const Comment = require("../models/comment");
const ObjectID = require('mongodb').ObjectID;

const auth = require("../middleware/auth");

const router = new express.Router();

// Upload a picture
const upload = multer({
  limits: {
    fileSize: 5000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
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
    post.userName = req.user.userName;
    await post.save();
    req.user.posts.unshift(post);
    await req.user.save();
    res.status(200).send();
  },
  (e, req, res, next) => {
    console.log(e);
    res.status(400).send({ error: e.message });
  }
);

// remove a post
router.post(
  "/posts/delete",
  auth,
  upload.single("image"),
  async (req, res) => {
    // remove all the comments 
    console.log(req.body)
    req.body.comments.forEach((comment) => {
      Comment.findByIdAndDelete(comment._id, function (err) {
        if (err) console.log(err);
        console.log("Successful deletion of comment");
      });
    })
    // remove the post from user 
    req.user.posts = req.user.posts.filter((post) => {
      post !== post._id
    })
    await req.user.save()
    // remove the post
    Post.findByIdAndDelete(req.body._id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion of post");
    })
    res.status(200).send();
  },
  (e, res) => {
    console.log(e);
    res.status(400).send({ error: e.message });
  }
);


// get the img src of a file given the post _id
router.get("/posts/picture/:id", auth, async (req, res) => {
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

// get post
router.get("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("comments");
    post.picture = undefined;
    res.send(post);
  } catch (e) {
    res.status(404).send(e);
  }
});

// like a post
router.post("/posts/like", auth, async (req, res) => {
  try {
    const user = req.user;
    const post = await Post.findOne({ _id: req.body._id });
    post.likes.push(user);
    await post.save();
    res.status(201);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// unlike a post

router.post("/posts/unlike", auth, async (req, res) => {
  try {
    const user = req.user;
    const post = await Post.findOne({ _id: req.body._id });
    post.likes.splice(post.likes.indexOf(auth._id), 1);
    await post.save();
    res.status(201);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// add a comment
router.post("/comment/create", auth, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.body.postId });
    const comment = new Comment({
      text: req.body.comment,
      user: req.user,
      post: post,
      userName: req.user.userName,
    });
    await comment.save();
    post.comments.push(comment);
    await post.save();
    res.status(201).send(await Comment.findOne({ _id: comment._id }));
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// delete a comment
router.post("/comments/delete", auth, async (req, res) => {
  try {
    console.log(req.body.comment)
    // remove the comment from the post 
    const post = await Post.findOne({ _id: req.body.comment.post });
    post.comments = post.comments.filter((comment) => {
      return String(comment._id) !== String(req.body.comment._id)
    })
    await post.save()

    // remove the comment document 
    Comment.findByIdAndDelete(req.body.comment._id, function (err) {
      if (err) console.log(err);
      console.log("Successful deletion");
    });
    res.status(201).send();
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});



module.exports = router;

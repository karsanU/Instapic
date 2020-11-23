const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");
const Post = require("../models/post");

const router = new express.Router();

// USERS
// Signup a user.
router.post("/users/create", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    user.token = token;
    user.following.unshift(user._id);
    await user.save();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// Get a user's public profile
router.get("/users/fetch/:username", auth, async (req, res) => {
  try {
    userName = req.params.username;
    const user = await await User.findOne({ userName });
    delete user["token"];
    delete user["passwords"];
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send(e);
    console.log(e);
  }
});

// see if a given email already exists
router.get("/users/isEmailUnique/:email", async (req, res) => {
  email = req.params.email;
  try {
    if ((await User.find({ email }).exec()).length < 1) {
      res.status(200).send({ emailExists: false });
    } else {
      res.status(200).send({ emailExists: true });
    }
  } catch (e) {
    res.status(400).send(e);
  }
});

// see if a given username already exists
router.get("/users/isUsernameUnique/:username", async (req, res) => {
  userName = req.params.username;
  try {
    if ((await User.find({ userName }).exec()).length < 1) {
      res.status(200).send({ usernameExists: false });
    } else {
      res.status(200).send({ usernameExists: true });
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//login a user
router.post("/users/login", async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(201).send({ user });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//get logged in user's updated profile
router.get("/users/updatedUser", auth, async (req, res) => {
  try {
    const user = req.user;
    res.status(201).send(user);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// follow someone
router.post("/users/follow", auth, async (req, res) => {
  try {
    const user = req.user;
    const toFollowUser = await User.findOne({ userName: req.body.userName });
    if (!user.following.includes(toFollowUser._id)) {
      user.following.unshift(toFollowUser);
      toFollowUser.followers.unshift(user);
      await user.save();
      await toFollowUser.save();
    }
    res.status(201);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// follow someone
router.post("/users/unfollow", auth, async (req, res) => {
  try {
    const user = req.user;
    const toFollowUser = await User.findOne({ userName: req.body.userName });
    if (user.following.includes(toFollowUser._id)) {
      user.following.splice(user.following.indexOf(toFollowUser._id), 1);
      toFollowUser.followers.splice(
        toFollowUser.followers.indexOf(user._id),
        1
      );
      await user.save();
      await toFollowUser.save();
    }

    res.status(201);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

// get user's feed

router.get("/users/feed", auth, async (req, res) => {
  try {
    let user = req.user;
    const result = await Post.find(
      { user: { $in: user.following } },
      { _id: 1 }
    )
      .sort({ date: -1 })
      .limit(20);
    console.log(result);
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

module.exports = router;

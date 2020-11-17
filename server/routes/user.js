const express = require("express");
const multer = require("multer");
const sharp = require("sharp");
const User = require("../models/user");
const auth = require("../middleware/auth");

const router = new express.Router();

// USERS
// Signup a user.
router.post("/users/create", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
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
    console.log(req);
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
    )
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});
module.exports = router;

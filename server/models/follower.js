const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const followerSchema = Schema({
  followed: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  following: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  time: { type: Date, default: Date.now },
});

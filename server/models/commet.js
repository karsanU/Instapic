const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = Schema({
  description: String,
  post: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  time: { type: Date, default: Date.now },
});

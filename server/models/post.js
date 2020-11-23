const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  picture: {
    type: Buffer,
  },
  time: { type: Date, default: Date.now },
  likes: { type: [{ type: Schema.Types.ObjectId, ref: "User" }] },
  comments: {
    type: [{ type: Schema.Types.ObjectId, ref: "Comment" }]
  },
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

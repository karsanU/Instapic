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
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;

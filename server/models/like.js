const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const likeSchema = Schema({
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



const Like = mongoose.model("Like", likeSchema);
module.exports = Like;

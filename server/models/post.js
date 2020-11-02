const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = Schema({
  name: String,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  time: { type: Date, default: Date.now },
});

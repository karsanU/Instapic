const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: String,
  email: String,
  password: String,
  userName: String,
  time: { type: Date, default: Date.now },
});

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");

const userSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
    required: true,
  },
  posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
  bio: {
    type: String,
    default: "",
  },
  token: {
    type: String,
    default: "",
  },
  followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

// Methods are only accessible on the instances of the model.
userSchema.methods.generateAuthToken = async function (req, res) {
  const user = this;
  const token = jwt.sign(
    { _id: user._id.toString() },
    "this is a secret key....."
  );
  return token;
};

// Check user's login credentials.
// Statics are accessible on the models.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Unable to login.");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Unable to login.");
  }

  return user;
};

// Hash the passwords upon creation and update.
userSchema.pre("save", async function (next) {
  // The current user that is about to be saved.
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  // Next must be called to finish the process of saving the user.
  next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;

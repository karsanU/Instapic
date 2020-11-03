// create server
const express = require("express");
const app = express();
const port = 3001;

// setup database
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/InstaPic-dev-db", {
  useNewUrlParser: true,
  useCreateIndex: true,
});

// setup the routes
const userRouter = require("./routes/user");
app.use(express.json());
app.use(userRouter);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

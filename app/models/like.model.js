const mongoose = require("mongoose");

const Like = mongoose.model(
  "Like",
  new mongoose.Schema({
    postID: String,
    userID: String

  },
  { timestamps: true }
  )
);

module.exports = Like;

const mongoose = require("mongoose");

const Comment = mongoose.model(
  "Comment",
  new mongoose.Schema({
    text: String,
    postID: String,
    user:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    

  },
  { timestamps: true }
  )
);

module.exports = Comment;
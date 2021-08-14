const mongoose = require("mongoose");

const Post = mongoose.model(
  "Post",
  new mongoose.Schema({
    text: String,
    companyID: String,
    // group where the post is posted if it is posted in a group
    groupID: String,
    photo: String,
    is_private: Boolean(false),
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    // voorlopig niet gebruiken
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like"
    }],
    


  },
  { timestamps: true }
  )
);

module.exports = Post;
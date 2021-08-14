const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    email: String,
    password: String,
    companyID: String,
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role"
      }
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Group"
      }
    ],
    photo: String,
    position: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Position"
    },
    linkedin: String,
    
    
  },
  { timestamps: true }
  )
);

module.exports = User;
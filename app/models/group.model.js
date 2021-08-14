const mongoose = require("mongoose");

const Group = mongoose.model(
  "Group",
  new mongoose.Schema({
    name: String,
    companyID: String,
    members: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
    ],
    photo: String,
    themeColor: String,
    isPrivate: Boolean(false),
  

    
  },
  { timestamps: true }
  )
);

module.exports = Group;
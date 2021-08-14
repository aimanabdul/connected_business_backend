const mongoose = require("mongoose");

const Company = mongoose.model(
  "Company",
  new mongoose.Schema({
    name: String,
    bio: String,
    creatorID: String,
    photo: String,
    address: String,
    postalCode: String,
    city: String,
    longtitude: String,
    latitude: String,
    employees: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    //voorlopig groups niet gebruikt
    groups: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Group"
        }
      ],
      // voorlopig positions niet gebruikt
    positions:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Position"
      }],

},
  { timestamps: true }
  )
);

module.exports = Company;
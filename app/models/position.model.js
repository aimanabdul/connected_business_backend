const mongoose = require("mongoose");

const Position = mongoose.model(
  "position",
  new mongoose.Schema({
    name: String,
    companyID: String,
  })
);

module.exports = Position;
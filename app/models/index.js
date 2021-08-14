const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.comment = require("./comment.model");
db.company = require("./company.model");
db.group = require("./group.model");
db.like = require("./like.model");
db.position = require("./position.model");
db.post = require("./post.model");
db.role = require("./role.model");
db.user = require("./user.model");


db.ROLES = ["superadmin", "admin", "moderator", "user"];

module.exports = db;
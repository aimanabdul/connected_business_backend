const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require('mongoose');


const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// access uploads publicly
app.use('/uploads', express.static('uploads'))

//connection to MongoDB database
const db = require("./app/models");
const dbConfig = require("./app/config/db.config");
const Role = db.role;
db.mongoose
  .connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

// initial data
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });
      
      new Role({
        name: "superadmin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'superadmin' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });

      new Role({
        name: "employee"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'employee' to roles collection");
      });

      new Role({
        name: "moderator"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'moderator' to roles collection");
      });

      new Role({
        name: "member"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'member' to roles collection");
      });

      
    }
  });
}
  

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to ConnectedB " });
});
// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/company.routes')(app);
require('./app/routes/group.routes')(app);
require('./app/routes/post.routes')(app);
require('./app/routes/like.routes')(app);
require('./app/routes/comment.routes')(app);
require('./app/routes/position.routes')(app);
require('./app/routes/role.routes')(app);



// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
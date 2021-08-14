const db = require("../models");
const Role = db.role;


exports.create = (req, res) => {
    // Validate request
    if (!req.body.name) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
    }
  
    // Create a Role
    const role = new Role({
      name: req.body.name,
    });
  
    // Save Role in the database
    role.save(role)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({ message:"Some error occurred while creating the Role"});
      });
};


exports.findAll = (req, res) => {
  var roles = [];
    Role.find()
      .then(data => {
        //alt shift a
    /*     for (let i = 0; i < data.length; i++) {
          roles._id.push(data[i]._id);
          roles.name.push("ROLE_" + data[i].name.toUpperCase());
        } */
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({ message:"Some error occurred while retrieving Roles"});
      });
};

exports.findOne = (req, res) => {
    const id = req.params.id;
 
    Role.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Role with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res.status(500).send({ message: "Error retrieving Role with id=" + id });
      });
};

exports.update = (req, res) => {
    if (!req.body) {
      return res.status(400).send({ message: "Data to update can not be empty!"});
    }
  
    const id = req.params.id;
  
    Role.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({message: `Cannot update Role with id=${id}. Maybe Role was not found!`});
        } else res.send({ message: "Role was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({message: "Error updating Role with id=" + id});
      });
};

exports.delete = (req, res) => {
    const id = req.params.id;
  
    Tutorial.findByIdAndRemove(id)
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete Role with id=${id}. Maybe Role was not found!`
          });
        } else {
          res.send({message: "Role was deleted successfully!"});
        }
      })
      .catch(err => {
        res.status(500).send({message: "Could not delete Role with id=" + id});
      });
  };
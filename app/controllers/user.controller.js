const db = require("../models");
const Company = db.company;
const User = db.user;
const Role = db.role


// find all users by company id
exports.findAllByCompanyId = (req, res) => {
  const id = req.params.id;
  User.find({companyID: id})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({ message: "Some error occurred while retrieving Users" });
  });
  
};

// find a user by email
exports.findOneByEmail = (req, res) => {
  const email = req.params.email

  User.findOne({email: email})
  .then(data => {
    if (!data)
      res.status(404).send({ message: "Not found User with email " + email });
    else res.send(data);
  })
  .catch(err => {
    res.status(500).send({ message: "Error retrieving User with email = " + email });
  });
}



// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findById(id)
    .populate("roles")
    .populate("groups")
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found User with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res.status(500).send({ message: "Error retrieving User with id=" + id });
    });
};

// Update a User by the id in the request
exports.update = (req, res) => {

  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({message: `Cannot update User with id=${id}. Maybe User was not found!`});
      } 
      else res.send({ message: "User was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({ message: "Error updating User with id=" + id});
    });
  
};



// Delete a User with the specified id in the request
exports.delete = (req, res) => {
 
  
};



const db = require("../models");
const User = db.user;
const Group = db.group;

// Create and Save a new Group
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
      res.status(400).send({ message: "Content can not be empty!" });
      return;
  }

  // Create a new Group
  const group = new Group({
      name: req.body.name,
      companyID: req.body.companyID,
      //isPrivate: req.body.isPrivate
  });

    // Save Group in the database
  group.save(group)
    .then(data => {
        //res.send(group);
        res.status(200).send({ message: "Group " + data.name + " is successfully created"})
    })
    .catch(err => {
        res.status(500).send({message: err.message || "Some error occurred while creating the Group"});
    });

};

// Retrieve all Groups of a company.
exports.findAll = (req, res) => {
  const companyID = req.params.company_id;
  

  Group.find({ companyID: companyID })
    .then(data => {
    res.status(200).send(data);
    })
    .catch(err => {
    res.status(500).send({message:err.message || "Some error occurred while retrieving Groups"});
    });


};

// Find a single Group with an id in the request
exports.findOne = (req, res) => {

  const id = req.params.id;

  Group.findById(id)
    .populate("members", "-__v")
    .then(data => {
      if (!data)
          res.status(404).send({ message: "Not found Group with id " + id });
      else res.status(200).send(data);
    })
    .catch(err => {res.status(500).send({ message: "Error retrieving Group with id=" + id });
      });
  
};

// Update a Group by the id in the request
exports.update = (req, res) => {

  if (!req.body) {
      return res.status(400).send({ message: "Data to update can not be empty!"});
  }
  
  const id = req.params.id;

  Group.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
  .then(data => {
    if (!data) {
    res.status(404).send({message: `Cannot update Group with id=${id}. Maybe Group was not found!`});
    } 
    else res.status(200).send({ message: "Group was updated successfully." });
  })
  .catch(err => {
      res.status(500).send({message: "Error updating Group with id=" + id});
  });
  
};

// Delete a Group with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Group.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({message: `Cannot delete Group with id=${id}. Maybe Group was not found!`});
      } else {
        res.status(200).send({message: "Group was deleted successfully!"});
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Group with id=" + id});
    });
};

// Add a member into a Group bij id in the request
exports.addMember = (req, res) =>{
  const user_id = req.body.user_id;
  const group_id = req.body.group_id;
  let user;
  let group;
  //find user and updating its members
  User.findById(user_id)
  .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found User with id " + user_id });
    else 
      user = data;
      // check if the group already exist in user
      for (let i = 0; i < user.groups.length; i++) {
        if (user.groups[i]._id === group_id) {
          res.status(500).send({ message: "Cannot add! This group already exist "});
          return;
        } 
      }
      // find group with group_id to update the user its groups
      Group.findById(group_id)
      .then(data => {
        if (!data)
            res.status(404).send({ message: "Not found Group with id " + group_id });
        else 
          // updating the user its groups
          user.groups.push(data);
          //save user
          user.save(user)
            .then(data => {
              res.status(200).send(data);
            })
            .catch(err => {
              res.status(500).send({message: err.message || "Some error occurred while adding member to this group."});
            });
          //res.status(200).send(user);
        })
        .catch(err => {
          res.status(500).send({ message: err.message || "Error retrieving Group with id=" + group_id });
        });
      
      
    })
    .catch(err => {
      res.status(500).send({ message: err.message || "Error retrieving User with id=" + user_id });
    });

  //find group and update its members
  Group.findById(group_id)
  .then(data => {
    if (!data)
        res.status(404).send({ message: "Not found Group with id " + group_id });
    else 
      group = data;
      // check if the group already exist in user
      for (let i = 0; i < user.groups.length; i++) {
        if (group.members[i]._id === user._id) {
          res.status(500).send({ message: "Cannot add! This group already exist "});
          return;
        } 
      }
      group.members.push(user);
      group.save(group)
        .then(data => {
          res.status(200).send(data);
        })
        .catch(err => {
          res.status(500).send({message: err.message || "Some error occurred while adding member to this group."});
        });
      
    })
    .catch(err => {res.status(500).send({ message: err.message || "Error retrieving Group with id=" + group_id });
  });

}



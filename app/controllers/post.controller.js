const db = require("../models");
const Company = db.company;
const User = db.user;
const Group = db.group;
const Post = db.post;

// Create and Save a new Post
exports.create = (req, res) => {
    
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    // Create a Tutorial
    const post = new Post({
        text: req.body.text,
        companyID: req.body.companyID,
        author: req.body.author,       
        //photo: req.body.photo ? req.body.photo: "post_standaard.jpg",
        is_private: req.body.is_private ? req.body.is_private : false
    });
    post.save(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post"
      });
    });
 

};

// Retrieve all Posts by company id.
exports.findAll = (req, res) => {

    const companyID = req.params.id;

    Post.find({companyID: companyID})
      .populate("author", "-__v")
      .populate("likes", "-__v")
      .then(data => {
      res.status(200).send(data);
      })
      .catch(err => {
      res.status(500).send({message:"Some error occurred while retrieving Posts."});
      });
  
};

// Find a single Post with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Post.findById(id)
      .then(data => {
      if (!data)
          res.status(404).send({ message: "Not found Post with id " + id });
      else res.status(200).send(data);
      })
      .catch(err => {res.status(500).send({ message: "Error retrieving Post with id=" + id });
        });

};

// Update a Post by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!"});
    }
    
    const id = req.params.id;
  
    Post.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({message: `Cannot update Post with id=${id}. Maybe Post was not found!`});
        } 
        else res.status(200).send({ message: "Post was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({message: "Error updating Post with id=" + id});
    });
  
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.findByIdAndRemove(id)
    .then(data => {
      if (!data) {
        res.status(404).send({message: `Cannot delete Post with id=${id}. Maybe Post was not found!`});
      } else {
        res.status(200).send({message: "Post was deleted successfully!"});
      }
    })
    .catch(err => {
      res.status(500).send({ message: "Could not delete Post with id=" + id});
    });
  
};
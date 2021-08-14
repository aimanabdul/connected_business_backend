const db = require("../models");
const Like = db.like;


// Create and Save a new Like
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a new Like
    const like = new Like({
        postID: req.body.postID,
        userID: req.body.userID
    });
  
    // Save Like in the database
    like.save(like)
      .then(data => {
          res.status(200).send(data)
      })
      .catch(err => {
          res.status(500).send({message: err.message || "Some error occurred while creating the Like"});
      });
  
};

exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Like.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Like with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Like with id=" + id });
      });
  };

// Get likes by post id
exports.findLikesOfPost = (req, res) => {

    id = req.body.id
    Like.find({postID: id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message: err.message || "Some error occurred while retrieving likes for Post with id: " + id});
        });

};

// Delete a Like
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Like.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({message: `Cannot delete Like with id=${id}. Maybe Like was not found!`});
        } else {
          res.status(200).send({message: "Like was deleted successfully!"});
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not delete Like with id=" + id});
      });
      // ToDo=> extend this method to be able to delete likes from Post
      //also users can only delete their own likes
    
  };
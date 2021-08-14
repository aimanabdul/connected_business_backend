const db = require("../models");
const Comment = db.comment;
const User = db.user;


// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a new Comment
    const comment = new Comment({
        text: req.body.text,
        postID: req.body.postID,
        user: req.body.userID,
    });

    //user_id = req.body.user_id;
    // find the user
    /* User.findById(user_id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not found Comment with id " + user_id });
            else
                comment.user = data
                //res.status(200).send(data);
        })
        .catch(err => {res.status(500).send({ message: "Error retrieving Comment with id=" + user_id });
        }); */
  
    // Save Like in the database
    comment.save(comment)
      .then(data => {
          res.status(200).send({ message: "Comment is successfully created."})
      })
      .catch(err => {
          res.status(500).send({message: err.message || "Some error occurred while creating the Comment."});
      });
  
};

// Retrieve all Comments by post id
exports.findAllCommentsByPostId = (req, res) => {

    // get the id of the post from request body
    id = req.params.id
    Comment.find({postID: id})
    .populate("user", "-__v")
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while retrieving comments for post with id:" + id});
        });

};


// Update a Comment by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!"});
    }
    
    const id = req.params.id;
  
    Comment.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({message: `Cannot update Comment with id=${id}. Maybe Post was not found!`});
        } 
        else res.status(200).send({ message: "Comment was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({message: "Error updating Comment with id=" + id});
    });
  
};

// Delete a Comment
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Comment.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({message: `Cannot delete Like with id=${id}. Maybe Comment was not found!`});
        } else {
          res.status(200).send({message: "Comment was deleted successfully!"});
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not delete Like with id=" + id});
      });
      // ToDo=> extend this method to be able to delete comments from Post
      //also users can only delete their own comments
    
};
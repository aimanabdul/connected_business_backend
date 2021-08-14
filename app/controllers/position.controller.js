const db = require("../models");
const Position = db.position;

// Create and Save a new Position
exports.create = (req, res) => {
     // Validate request
     if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a new Position
    const position = new Position({
        name: req.body.name,
        companyID: req.body.companyID,
    });
     // Save Position in the database
     position.save(position)
     .then(data => {
         res.status(200).send({ message: "Position is successfully created."})
     })
     .catch(err => {
         res.status(500).send({message: err.message || "Some error occurred while creating the Position."});
     });
};

// Retrieve all Positions of by company id
exports.findAllPositionsOfCompany = (req, res) => {

    id = req.params.id
    Position.find({companyID: id})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while retrieving Positions for company with id:" + id});
        });
  
};

// Retrieve all Positions of by company id
exports.findOne = (req, res) => {

    id = req.params.id
    Position.findById(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while retrieving with id: " + id});
        });
  
};


// Update a Position by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Data to update can not be empty!"});
    }
    
    const id = req.params.id;
  
    Position.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
        if (!data) {
        res.status(404).send({message: `Cannot update Position with id=${id}. Maybe Position was not found!`});
        } 
        else res.status(200).send({ message: "Position was updated successfully." });
    })
    .catch(err => {
        res.status(500).send({message: "Error updating Position with id=" + id});
    });
};

// Delete a Position with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Position.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({message: `Cannot delete Position with id=${id}. Maybe Position was not found!`});
        } else {
          res.status(200).send({message: "Position was deleted successfully!"});
        }
      })
      .catch(err => {
        res.status(500).send({ message: "Could not delete Position with id=" + id});
      });
      // ToDo=> extend this method to be able to delete Positions from company
      
};

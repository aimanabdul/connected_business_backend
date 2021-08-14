const db = require("../models");
const Company = db.company;
const User = db.user;
const Role = db.role

// Create and Save a new Company
exports.create = (req, res, next) => {

    //validate request
    if (!req.body) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create Company
    const company = new Company({
    name: req.body.name,
    bio: req.body.bio,
    creatorID: req.body.creatorID,
    address: req.body.address,
    postalCode: req.body.postalCode,
    city: req.body.city
    });

    //store photo
    if(req.file){
        company.photo = req.file.path
    }


    // get superadmin role
    let superadminRole;
    

    // add superadmin role into creator of company
    var isSuperadmin = new Boolean(false);
    User.findById(req.body.creatorID).exec((err, user) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
    
        Role.find({_id: { $in: user.roles }},
          (err, roles) => {
                if (err) {
                res.status(500).send({ message: err });
                return;
                }
        
                for (let i = 0; i < roles.length; i++) {
                    if (roles[i].name === "superadmin") {
                        next();
                        return;
                    }
                }
                //if not super admin
                //Get the superadmin role object and add it to the user
                Role.findOne({name: "superadmin"}, (err, role) => {
                    if(err){
                        res.status(500).send({message: "Role superadmin not fount." || err})
                        return
                    }
                    else 
                        user.roles.push(role);
                        //save role in user (this should be done here to save the role correctly)
                        user.save(user)
                        .then(data => {
                        res.send(data);
                        })
                        .catch(err => {
                            res.status(500).send({message:err.message || "Some error occurred while updating for superadmin role user."});
                        }); 
                });

                //save company
                company.save(company)
                .then(data=>{
                    //set companyID for user
                    user.companyID = data._id;
                //save companyID in user (this should be done here to save the role correctly)
                user.save(user)
                .then(data => {
                res.send(data);
                })
                .catch(err => {
                    res.status(500).send({message:err.message || "Some error occurred while updating companyID for user."});
                }); 
                })
                .catch(err=>{
                    res.status(500).send({message:err.message || "Some error occurred while creating the company."});
                });
            }
        );

        
        
    

    });
    

    
};



// Retrieve all companies from the database.
exports.findAll = (req, res) => {
  
};

// Find a single Company with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Company.findById(id)
    .populate("employees", "-__v")
      .then(data => {
      if (!data)
          res.status(404).send({ message: "Not found Company with id " + id });
      else res.status(200).send(data);
      })
      .catch(err => {res.status(500).send({ message: "Error retrieving Company with id=" + id });
        });
};

// Update a Company by the id in the request
exports.update = (req, res) => {
    // user_id, company_id needed
    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
    }
    let companyID = req.params.company_id;
    let userID = req.params.user_id
    Company.findByIdAndUpdate(companyID, req.body, { useFindAndModify: false })
        .then(data => {
        if (!data) {
            res.status(404).send({message: `Cannot update Company with id=${companyID}. Maybe Company was not found!`});
        }
        // check if requesting user is creator
         else if (data.creatorID != userID){
            res.send({message: "No access to execute request!"})
            return;
        }
        
        else res.send({ message: "Company was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error updating Company with id=" + companyID });
        });

      

};

// Delete a Company with the specified id in the request
exports.delete = (req, res) => {
    const userID = req.params.user_id;
    const companyID = req.params.company_id;
    
 Company.findByIdAndRemove(companyID)
    .then(data => {
    if (!data) {res.status(404).send({message: `Cannot delete Company with id=${companyID}. Maybe Company was not found!`});
    } 
    
    else if(data.creatorID != userID){
        res.send({ message: "Unauthorized action!"});
    }
    
    else {
        // remove superadmin role from user
        User.findById(userID, { useFindAndModify: false })
        .then(user => {
            if (!user)
            res.status(404).send({ message: "Not found User with id " + userID });
            //else remove superadmin role
            // !!!!!to fix
            else 
                for (let i = 0; i < user.roles.length; i++) {
                    if (user.roles[i].name === "superadmin") {
                        user.roles[i].delete();   
                    }
                }
                user.save(user)
                    .then(user =>{
                        res.send({message: "role superadmin is deleted from user with id " + userID})
                    })
                    // end save user
                    .catch(err=>{
                        res.status(500).send({message: err.message || "some error occurred while updating roles in user."});
                    });
                
        })
        .catch(err => {
        res.status(500).send({ message: err.message || "Error retrieving User with id=" + userID });
        });

        //company deleted
        res.send({
        message: "Company was deleted successfully!"
        });
    }
    })
    .catch(err => {
    res.status(500).send({message: "Could not delete Company with id=" + companyID});
    });
   
};

//!!!!!!!!!!!!!!!!!!! Niet gebruikt, mag weg!!!!!!!!!!!!!!!!!!!!!!!
// Add employee to company
exports.addEmployee = (req, res, )  =>{
    // validate req
    if(!req.body){
        res.send({ message: "No data provided, request denied!"});
    }
    const companyID = req.params.company_id;
    const email = req.body;
    console.log(email);
    // find user by email
    User.findOne({email: email}, (err, user) => {
        if (!user){
            res.status(404).send({message: "Cannot finde user with this email: " + email})
            
        }
        else{

             // find companyByID
             Company.findById(companyID, { useFindAndModify: false })
             .then(data=>{
                 data.employees.push(user);
                 data.save(data)
                         .then(data =>{
                             res.send({message: "Employee successfully added."})
                         })
                         // end save user
                         .catch(err=>{
                             res.status(500).send({message: err.message || "Some error occurred while adding employee to company"});
                         });
             })
             .catch(err => {
                 res.status(500).send({ message: err.message || "Some error occurred while adding employee to company" });
             });
           
        }

        
        

        
    });
        
   
    

}


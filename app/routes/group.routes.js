const { authJwt } = require("../middleware");
const controller = require("../controllers/group.controller");

module.exports = function(app){
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // get all groups by company id
  router.get("/:company_id",  controller.findAll);

  // Create a new group
  router.post("/",  controller.create);

  // Get a group by ID
  router.get("/:id",  controller.findOne);

  // Update group
  router.put("/:id/",
  
  controller.update);

  // Delete a group
  router.delete("/:id/",
  
  controller.delete);


  //[authJwt.verifyToken, authJwt.isSuperadmin, authJwt.isAdmin ,authJwt.isModerator]

  // Add a member to a group
  router.post("/", controller.create);

  // Add a member to a group
  router.put("/add/member", controller.addMember);

  //find all groups by company id
  router.get("/company/:company_id", controller.findAll);

  //find a Group by id
  router.get("/group/:id", controller.findOne);

    

  app.use('/connectedb/groups', router);

};
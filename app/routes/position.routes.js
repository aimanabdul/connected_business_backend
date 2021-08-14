const { authJwt } = require("../middleware");
const controller = require("../controllers/position.controller");


module.exports = function(app){
  app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
  });

  var router = require("express").Router();

  // Create a new Position
  router.post("/",  
  controller.create);

  // Find Positions of a company with company id
  router.get("/company/:id",  
  controller.findAllPositionsOfCompany );

  // Find a Position by id
  router.get("/:id",  
  controller.findOne );

  // Update Position
  router.put("/:id",
  
  controller.update);

  //Delete Position
  router.delete("/:id",  
  
  controller.delete);

  app.use('/connectedb/positions', router);



};
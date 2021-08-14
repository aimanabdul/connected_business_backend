const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  var router = require("express").Router();

  // Find all users with company id
  router.get("/company/:id",  controller.findAllByCompanyId);

  // Find a User with an Id
  router.get("/user/:id", [authJwt.verifyToken], controller.findOne);

    // Find a User with email
    router.get("/user/email/:email", controller.findOneByEmail);

  // update a User with an Id
  router.put("/:id" , [authJwt.verifyToken], controller.update);




 

 
    

  app.use('/connectedb/users', router);
};
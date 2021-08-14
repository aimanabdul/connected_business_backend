const { authJwt, upload } = require("../middleware");
const controller = require("../controllers/company.controller");

module.exports = function(app){
  app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
  });

  var router = require("express").Router();

  // Find a Company with an Id
  router.get("/:id", [authJwt.verifyToken], controller.findOne);

  // Create a new Company
  router.post("/", [ authJwt.verifyToken], controller.create);
  //[authJwt.verifyToken, upload.single('photo')]

  // add employee to company
  router.post("/addemployee/:company_id",   controller.addEmployee);

  // Update Company
  router.put("/:company_id/:user_id", [authJwt.verifyToken], controller.update);

  // Delete a Company
  router.delete("/:company_id/:user_id", controller.delete);
    

  app.use('/connectedb/company', router);

};
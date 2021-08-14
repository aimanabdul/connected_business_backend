const { authJwt } = require("../middleware");
const controller = require("../controllers/post.controller");

module.exports = function(app){
  app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
  });

  var router = require("express").Router();

  // get all posts
  router.get("/company/:id",controller.findAll);

  // Create a new post
  router.post("/", [authJwt.verifyToken],controller.create);

  // Get a post by ID
  router.get("/:id",  [authJwt.verifyToken],controller.findOne);

  // Update post
  router.put("/:id",
  [authJwt.verifyToken],controller.update);

  // Delete a post
  router.delete("/:id",
  [authJwt.verifyToken],controller.delete);
  
  app.use('/connectedb/posts', router);

};
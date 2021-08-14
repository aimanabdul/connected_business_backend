const { authJwt } = require("../middleware");
const controller = require("../controllers/like.controller");


module.exports = function(app){
  app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
  });

  var router = require("express").Router();

  // Create a new group
  router.post("/",  
  
  controller.create);

  // Find likes of a post with post id
  router.get("/post/id",  
  [authJwt.verifyToken],
  controller.findLikesOfPost);

  // Find likes of a post with post id
  router.get("/:id",  
  [authJwt.verifyToken],
  controller.findLikesOfPost);

  // Find likes of a post with post id
  router.get("/post/id",  
  [authJwt.verifyToken],
  controller.findLikesOfPost);

  router.delete("/:id",  
  [authJwt.verifyToken],
  controller.delete);

  app.use('/connectedb/likes', router);



};
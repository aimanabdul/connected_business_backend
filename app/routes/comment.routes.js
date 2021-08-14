const { authJwt } = require("../middleware");
const controller = require("../controllers/comment.controller");


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
  [authJwt.verifyToken],
  controller.create);

  // Find comments of a post with post id
  router.get("/post/:id",  
  [authJwt.verifyToken],
  controller.findAllCommentsByPostId);

  // Update comment
  router.put("/:id",
  [authJwt.verifyToken, authJwt.isSuperadmin, authJwt.isAdmin ,authJwt.isModerator],
  controller.update);

  //Delete Comment 
  router.delete("/:id",  
  [authJwt.verifyToken],
  controller.delete);

  
  app.use('/connectedb/comments', router);

};
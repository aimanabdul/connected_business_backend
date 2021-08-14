const { authJwt } = require("../middleware");
const controller = require("../controllers/role.controller");

module.exports = function(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    var router = require("express").Router();

    // Create a new post
    router.post("/", [authJwt.verifyToken, authJwt.isSuperadmin], controller.create);

    // Get a All Roles
    router.get("/", [authJwt.verifyToken], controller.findAll);

    // Get a post by ID
    router.get("/:id",  controller.findOne);

    app.use('/connectedb/roles', router);

}
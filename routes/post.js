const PostController = require("../controller/postController");
const authorizationAdmin = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

// Authentication
router.use(authentication);

// Authorization role admin
router.use(authorizationAdmin);

// Post Article
router.post("/create", PostController.postArticle);


module.exports = router;
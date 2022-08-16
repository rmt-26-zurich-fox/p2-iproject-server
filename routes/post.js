const PostController = require("../controller/postController");
const authorizationAdmin = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");
const router = require("express").Router();

// Get Review Data
router.get("/", PostController.getReviewData);

// Authentication
router.use(authentication);

// Authorization role admin
router.use(authorizationAdmin);

// Post Reviews
router.post("/create", PostController.postReview);


module.exports = router;
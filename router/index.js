const authentication = require("../middlewares/authentication");
const Login = require("../controller/login");
const PostController = require("../controller/post");
const Register = require("../controller/register");
const authorizationPost = require("../middlewares/authorizationPost");
const authorizationComment = require("../middlewares/authorizationComment");
const authorizationLike = require("../middlewares/authorizationLike");
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const router = require("express").Router();

router.post("/register", Register.postRegister);
router.post("/login", Login.postLogin);
router.post("/google-sign-in", Login.googleLogin);

router.use(authentication);

router.get("/post", PostController.readAllPost);
router.post("/post", PostController.addPost);
router.delete("/post/:id", authorizationPost, PostController.deletePost);
router.get("/post/:id", PostController.readPostById);
router.get("/profile/:id", PostController.readOtherProfil);
router.post("/comment/:id", PostController.addComment);
router.post("/like/:id", PostController.likePost);
router.delete("/like/:id", authorizationLike, PostController.unlikePost);
router.delete("/comment/:id/:commentId", authorizationComment, PostController.deleteComment);




module.exports = router;
const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.post("/google-sign-in", UserController.googleSignIn);
router.use(authentication);
router.get("/profile", UserController.myProfile);
router.post("/profile", UserController.updateMyProfile);
router.post("/leaderboards", UserController.updateMyLeaderboard);
router.post("/credit", UserController.updateMyCredit);
router.post("/registerCredit", UserController.registerCredit);

module.exports = router;
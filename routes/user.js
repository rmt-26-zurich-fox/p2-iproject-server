const router = require("express").Router();
const UserController = require("../controllers/UserController");
const { authentication } = require("../middlewares/authentication");

router.post("/register", UserController.register);
router.post("/login", UserController.login);
router.use(authentication);
router.get("/profile", UserController.myProfile);
router.post("/registerCredit", UserController.registerCredit);

module.exports = router;
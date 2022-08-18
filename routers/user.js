const router = require("express").Router();
const UserController = require("../controller/user-controller");

router.post("/register", UserController.createUser);
router.post("/login", UserController.login);
router.post("/google-sign-in", UserController.loginGoogle);

module.exports = router;

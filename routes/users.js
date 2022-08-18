const UserController = require("../controllers/userController");
const router = require("express").Router();

router.get("/", UserController.readUser)
router.post("/register", UserController.register);
router.post("/login", UserController.login);
module.exports = router;

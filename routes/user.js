const express = require("express");
const router = express.Router();
const UserController = require("../controllers/usercontroller");

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);
// router.get("/send", UserController.emailVerificationSend);
// router.get("/verify", UserController.emailVerification);
module.exports = router;

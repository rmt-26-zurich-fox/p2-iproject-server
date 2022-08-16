const express = require("express");
const UserController = require("../controllers/usercontroller");
const router = express.Router();

router.post("/register", UserController.userRegister);
router.post("/login", UserController.userLogin);

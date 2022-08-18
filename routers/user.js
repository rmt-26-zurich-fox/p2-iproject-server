const user = require("express").Router();
const { User } = require("../models");
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");

user.post("/userRegister", UserController.userRegister);
user.post("/userLogin", UserController.userLogin);

user.use(authentication);
module.exports = user;

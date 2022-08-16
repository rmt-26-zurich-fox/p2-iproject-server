const user = require("express").Router();
const UserController = require("../controllers/user");

user.post("/userRegister", UserController.userRegister);
user.post("/userLogin", UserController.userLogin);

module.exports = user;

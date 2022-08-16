const UserController = require("../controllers/userController");

const userRouter = require("express").Router();

// userRouter.post("/register", Controller.register);
userRouter.post("/login", UserController.login);
userRouter.post("/google-sign-in", UserController.googleSignin);

module.exports = userRouter;

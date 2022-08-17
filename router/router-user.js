const UserController = require("../controllers/user-controller");
const userRouter = require("express").Router();

userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);
userRouter.post("/google-sign-in", UserController.loginByGoogle);
// userRouter.get("/", UserController.getUser);

module.exports = userRouter;

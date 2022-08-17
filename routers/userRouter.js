const express = require("express");
const userRouter = express.Router();
const UserController = require("../controllers/UserController");

userRouter.get("/register", async (req, res) => {
  res.send("hello");
});

module.exports = userRouter;

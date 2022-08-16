const express = require("express");
const router = express.Router();
const routerUser = require("./user");
const routerTeacher = require("./teacher");
const errorHandler = require("../middlewares/errorHandler");

router.use("/users", routerUser);
router.use("/teachers", routerTeacher);
router.use(errorHandler);

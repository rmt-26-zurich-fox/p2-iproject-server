const express = require("express");
const router = express.Router();
const routerUser = require("./user");
const routerTeacher = require("./teacher");
const errorHandler = require("../middlewares/errorHandler");
const CoursesController = require("../controllers/coursecontroller");

router.use("/users", routerUser);
router.use("/teachers", routerTeacher);

router.get("/courses", CoursesController.fetchCourses);
router.get("/course/:courseId", CoursesController.fetchCoursesById);

router.use(errorHandler);

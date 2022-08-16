const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const routerUser = require("./user");
const routerTeacher = require("./teacher");
const routerStudent = require("./student");
const CoursesController = require("../controllers/coursecontroller");

router.use("/users", routerUser);
router.use("/students", routerStudent);
router.use("/teachers", routerTeacher);

router.get("/courses", CoursesController.fetchCourses);
router.get("/course/:courseId", CoursesController.fetchCoursesById);

router.use(errorHandler);

const express = require("express");
const errorHandler = require("../middlewares/errorHandler");
const router = express.Router();
const routerUser = require("./user");
const routerTeacher = require("./teacher");
const routerStudent = require("./student");
const CoursesController = require("../controllers/coursecontroller");
// const TeacherController = require("../controllers/teacherController");
const authentication = require("../middlewares/authentication");

// router.post("/google-calendar", TeacherController.googleCalendar);
router.use("/users", routerUser);
router.get("/courses", CoursesController.fetchCourses);
router.get("/course/:courseId", CoursesController.fetchCoursesById);
router.use(authentication);
router.use("/students", routerStudent);
router.use("/teachers", routerTeacher);

router.use(errorHandler);

module.exports = router;

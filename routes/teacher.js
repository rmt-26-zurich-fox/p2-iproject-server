const express = require("express");
const TeacherController = require("../controllers/teacherController");
const router = express.Router();

router.post("/courses/add", TeacherController.addCourse);
router.put("/courses/edit/:courseId", TeacherController.editCourse);
router.delete("/courses/delete/:courseId", TeacherController.deleteCourse);

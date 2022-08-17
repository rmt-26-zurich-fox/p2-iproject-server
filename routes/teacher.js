const express = require("express");
const TeacherController = require("../controllers/teacherController");
const { authorization } = require("../middlewares/authorization");
const router = express.Router();

router.post("/courses/add", TeacherController.addCourse);
router.put(
  "/courses/edit/:courseId",
  authorization,
  TeacherController.editCourse
);
router.delete(
  "/courses/delete/:courseId",
  authorization,
  TeacherController.deleteCourse
);
module.exports = router;

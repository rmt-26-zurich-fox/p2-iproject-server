const { Course } = require("../models");

class CoursesController {
  static async fetchCourses(req, res, next) {
    try {
      const course = await Course.findAll();

      res.status(200).json({
        message: `Successfully fetched course data`,
        course,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchCoursesById(req, res, next) {
    try {
      const { courseId } = req.params;

      const data = await Course.findByPk(+courseId);
      if (!data) {
        throw { name: `NotFound` };
      } else {
        res.status(200).json({ data });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CoursesController;

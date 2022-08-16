const { User, Course } = require("../models");

class TeacherController {
  static async addCourse(req, res, next) {
    try {
      const { title, description, duration, price } = req.body;
      const response = await Course.create({
        title,
        description,
        duration,
        price,
      });
      res.status(201).json({
        message: `successfully created new Course`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TeacherController;

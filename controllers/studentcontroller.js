const { User, Course, ShoppingCart, CourseList } = require("../models");

class StudentController {
  static async addShoppingCart(req, res, next) {
    try {
      const { courseId } = req.params;
      await ShoppingCart.create({
        UserId: req.user.id,
        CourseId: courseId,
      });
      console.log(req.user);
      res.status(201).json({
        message: `Course added to shopping cart`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async addToCourseList(req, res, next) {
    try {
      let data = await ShoppingCart.findAll({ where: { UserId: req.user.id } });
      const courseData = data.Course;
      const response = await CourseList.create({ courseData });
      res.status(201).json({
        message: `Course added to course list`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;

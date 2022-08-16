const { User, Course, ShoppingCart } = require("../models");

class StudentController {
  static async addShoppinCart(req, res, next) {
    try {
      const { courseId } = req.params;
      await ShoppingCart.create({
        where: {
          UserId: req.user.id,
          CourseId: courseId,
        },
      });
      res.status(201).json({
        message: `Course added to shopping cart`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;

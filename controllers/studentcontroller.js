const { User, Course, ShoppingCart, CourseList } = require("../models");

class StudentController {
  static async addShoppingCart(req, res, next) {
    try {
      const { courseId } = req.params;
      await ShoppingCart.create({
        UserId: req.user.id,
        CourseId: courseId,
      });
      res.status(201).json({
        message: `Course added to shopping cart`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchShoppingCart(req, res, next) {
    try {
      let data = await ShoppingCart.findAll({
        where: { UserId: req.user.id },
        include: Course,
      });
      console.log(data);

      res.status(200).json({ Course: data });
    } catch (error) {
      next(error);
    }
  }

  static async deleteShoppingCart(req, res, next) {
    try {
      const { cartId } = req.params;
      await ShoppingCart.destroy({ where: { id: cartId } });

      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  static async addToCourseList(req, res, next) {
    try {
      let data = await ShoppingCart.findAll({
        where: { UserId: req.user.id },
        include: Course,
      });
      const courseData = data.Course;
      console.log(data[0]);
      const response = await CourseList.create({ data });
      res.status(201).json({
        message: `Course added to course list`,
        response,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = StudentController;

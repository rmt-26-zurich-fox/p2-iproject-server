const { User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { body } = req;

      const register = await User.create(body);

      res
        .status(201)
        .json({ message: "Success register with email " + register.email });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

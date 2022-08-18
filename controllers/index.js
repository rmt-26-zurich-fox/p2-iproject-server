const { User } = require("../models");
const { signToken } = require("../helpers/jwt");
const { comparePass } = require("../helpers/bcrypt");

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

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email) throw { name: "Email is required" };
      if (!password) throw { name: "Password is required" };

      const login = await User.findOne({ where: { email } });

      if (!login) throw { name: "Invalid email or password" };
      if (!comparePass(password, login.password))
        throw { name: "Invalid email or password" };

      res.status(201).json({
        message: "Success login with email " + login.email,
        access_token: signToken(login.id),
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

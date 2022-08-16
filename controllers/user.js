const { User, Doctor } = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class UserController {
  static async userRegister(req, res, next) {
    try {
      const { email, password } = req.body;

      let data = await User.create({
        email,
        password,
        role: "User",
      });
      let createDoctor = await Doctor.create({ userId: data.id });
      res.status(201).json({
        message: `success create user with id ${data.id} and email ${data.email}`,
        id: data.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { name: "invalid_email/password" };
      }
      const comparePassword = compareHash(password, findUser.password);
      if (!comparePassword) {
        throw { name: "invalid_email/password" };
      }

      const payload = {
        id: findUser.id,
      };
      const getToken = createToken(payload);

      res.status(200).json({
        access_token: getToken,
        role: findUser.role,
        username: findUser.username,
        message: "Success Login",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

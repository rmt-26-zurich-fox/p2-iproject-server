const { compareHash } = require("../helpers/bycript");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async readUser(req, res, next) {
    try {
      let user = await User.findAll();
      res.status(200).json({
        message: "Success read user",
        user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;

      let user = await User.create({ email, password, role: `Admin` });
      res.status(201).json({
        message: `Success create user dengan id: ${user.id}, email: ${user.email}`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({
        where: {
          email,
        },
      });

      if (!user) {
        throw { name: `Invalid email/password` };
      }
      const compare = compareHash(password, user.password);
      if (!compare) {
        throw { name: `Invalid email/password` };
      }
      const payload = {
        id: user.id,
      };

      const accessToken = createToken(payload);

      res.status(200).json({
        access_token: `${accessToken}`,
        id: `${user.id}`,
        role: `${user.role}`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

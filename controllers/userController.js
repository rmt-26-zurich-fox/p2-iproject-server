const { hashPassword, compareHashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, role } = req.body;
      if (!password) {
        throw { name: "emptyPassword" };
      }
      const createdUser = await User.create({
        email: email,
        password: hashPassword(password),
        role: role,
      });
      res.status(201).json({
        message: `Successfully created user with ID ${createdUser.id}`,
        id: createdUser.id,
        email: createdUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!password) {
        throw { name: "emptyPassword" };
      }
      if (!email) {
        throw { name: "emptyEmail" };
      }
      const loggedUser = await User.findOne({
        where: {
          email: email,
        },
      });
      if (!loggedUser) {
        throw { name: "invalid_email/password" };
      }
      const comparePassword = compareHashPassword(
        password,
        loggedUser.password
      );
      if (!comparePassword) {
        throw { name: "invalid_email/password" };
      }
      const payload = {
        id: loggedUser.id,
        email: loggedUser.email,
      };
      const token = createToken(payload);
      res.status(200).json({ access_token: token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

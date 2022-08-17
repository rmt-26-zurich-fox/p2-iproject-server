const { hashPassword, compareHash } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!password) {
        throw { name: "Password is required" };
      }
      console.log(User);
      const createUser = await User.create({
        email,
        password: hashPassword(password),
      });

      res.status(201).json({ id: createUser.id, email: createUser.email });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "Email/Password is required" };
      }

      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw {
          name: "Invalid_email/password",
        };
      }

      const comparePassword = compareHash(password, findUser.password);
      if (!comparePassword) {
        throw {
          name: "Invalid_email/password",
        };
      }

      const payload = {
        id: findUser.id,
      };

      const access_token = createToken(payload);

      let emailLoggedIn = findUser.email;
      let idLoggedIn = findUser.id;

      res.status(200).json({
        access_token,
        emailLoggedIn,
        idLoggedIn,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;

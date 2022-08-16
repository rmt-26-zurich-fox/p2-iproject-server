const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { name: "Invalid email/password" };
      }
      const comparePassword = compareHash(password, findUser.password);
      if (!comparePassword) {
        throw { name: "Invalid email/password" };
      }
      const payload = {
        id: findUser.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        email: findUser.email,
        role: findUser.role,
        id: findUser.id,
      });

      req.user = {
        id: findUser.id,
        role: findUser.role,
        email: findUser.email,
      };
    } catch (error) {
      if (error.name === "Invalid email/password") {
        res.status(401).json({ message: `Invalid email/password` });
      } else res.status(500).json({ message: `Internal server error` });
    }
  }
}

module.exports = UserController;

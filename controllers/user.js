const { User, Profile } = require("../models");
const { compareHash } = require("../helpers/passwordHashing");
const { createToken } = require("../helpers/tokenHandling");

class Controller {
  static async register(req, res, next) {
    try {
      const { firstName, lastName, phone, username, email, password } = req.body;

      const newUser = await User.create({
        username,
        email,
        password,
      });

      await Profile.create({
        firstName,
        lastName,
        phone,
        role: "Customer",
        UserId: newUser.id,
      });

      res.status(201).json({message: "Your account successfully created"})
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        throw { name: "invalid email/password" };
      }

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "invalid email/password" };
      }

      const comparePassword = compareHash(password, foundUser.password);

      if (!comparePassword) {
        throw { name: "invalid email/password" };
      }

      const payload = { id: foundUser.id };
      const access_token = createToken(payload);

      res.status(200).json({ access_token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

const { comparePassword } = require("../helper/bcrypt");
const { token } = require("../helper/token");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    const { userName, email, password, phoneNumber } = req.body;

    try {
      let registered = await User.create({
        userName,
        email,
        password,
        phoneNumber,
      });
      res.status(201).json({
        message: "User successfully created",
        user: {
          id: registered.id,
          email: registered.email,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;
    try {
      if (!email || !password) {
        throw { name: "invalid login" };
      }
      let user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        throw { name: "invalid login" };
      }
      const compare = comparePassword(password, user.password);
      if (!compare) {
        throw { name: "invalid login" };
      }
      const userToken = token({
        id: user.id,
      });
      res.status(200).json({ access_token: userToken });
    } catch (error) {
      next(error);
    }
  }

  static async loginByGoogle(req, res, next) {
    console.log("masuk");
    const { google_token } = req.headers;

    try {
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: { email: payload.email },
        defaults: {
          userName: payload.email,
          email: payload.email,
          password: "google",
        },
        hooks: false,
      });

      const userToken = token({
        id: user.id,
      });

      res.status(200).json({ access_token: userToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

const { comparePassword } = require("../helper/bcrypt");
const { token } = require("../helper/token");
const { User } = require("../models");
// const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    const { userName, email, password } = req.body;

    try {
      let registered = await User.create({
        userName,
        email,
        password,
      });
      res.status(201).json({
        message: "User successfully created",
        user: {
          id: registered.id,
          email: registered.email,
        },
      });
    } catch (error) {
      console.log(error);
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
      console.log(error);
    }
  }

  // static async loginByGoogle(req, res, next) {
  //   const { google_token } = req.headers;

  //   try {
  //     const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  //     const ticket = await client.verifyIdToken({
  //       idToken: google_token,
  //       audience: process.env.GOOGLE_CLIENT_ID,
  //     });
  //     const payload = ticket.getPayload();

  //     const [user, created] = await User.findOrCreate({
  //       where: { email: payload.email },
  //       defaults: {
  //         email: payload.email,
  //         password: "google",
  //         role: "staff",
  //       },
  //       hooks: false,
  //     });

  //     const userToken = token({
  //       id: user.id,
  //     });

  //     res.status(200).json({ access_token: userToken });
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  static async getUser(req, res, next) {
    try {
      const user = req.user;
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

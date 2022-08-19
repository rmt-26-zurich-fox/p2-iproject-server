const { hashPassword, compareHash } = require("../helpers/bcrypt");
const { createToken, verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");


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

  static async googleSignIn(req, res, next) {
    try {
      const { token_google } = req.headers;

      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "ini_dari_google",
        },
        hooks: false,
      });

      const access_token = createToken({
        id: user.id,
      });

      res.status(200).json({
        access_token,
        email: user.email,
        id: user.id,
      });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }
}

module.exports = UserController;

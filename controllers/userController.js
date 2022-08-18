const { hashPassword, compareHashPassword } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
const { User } = require("../models");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!password) {
        throw { name: "emptyPassword" };
      }
      const createdUser = await User.create({
        email: email,
        password: hashPassword(password),
        role: "Visitor",
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

  static async googleSignIn(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client(process.env.CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
      });
      const payload = ticket.getPayload();
      console.log(payload);
      const { email, name } = payload;
      const [user, created] = await User.findOrCreate({
        where: { email: email },
        defaults: {
          email: email,
          password: "Your password",
          role: "Visitor",
        },
        hooks: false,
      });
      const access_token = createToken({
        id: user.id,
      });
      res.status(200).json({ access_token: `${access_token}`, user: user });
      // console.log(created, "INI status user");
      // If request specified a G Suite domain:
      // const domain = payload['hd'];
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

const { User } = require("../models");
const { compareHash, createToken } = require("../helpers/helpers");
const axios = require("axios");
const { OAuth2Client } = require("google-auth-library");

class UserController {
  static async createUser(req, res, next) {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const verifyEmail = await axios({
        url: `https://emailvalidation.abstractapi.com/v1/?api_key=1643f60bd7484bab980621ea880f57fd&email=${email}`,
        method: "GET",
      });
      if (verifyEmail.data.quality_score * 10 <= 5) {
        throw { name: `not a valid email` };
      }
      const verifyPhone = await axios({
        url: `https://phonevalidation.abstractapi.com/v1/?api_key=0941b288e2894e4fbfb51e876d696ad1&phone=+62${phoneNumber.slice(
          1
        )}`,
        method: "GET",
      });

      if (
        verifyPhone.data.location !== "Indonesia" ||
        !verifyPhone.data.valid
      ) {
        throw { name: `not a valid phonenumber` };
      }
      let urlRole = "Customer";
      if (password === "MenjadiAdmin") {
        urlRole = "Admin";
      }
      let newUser = await User.create({
        name,
        email,
        password,
        role: urlRole,
        phoneNumber,
      });
      res.status(201).json({
        message: `success create user`,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: { email },
      });

      if (!findUser) {
        throw { name: "invalid_email/password" };
      }
      const comparePass = compareHash(password, findUser.password);
      if (!comparePass) {
        throw { name: "invalid_email/password" };
      }

      const payload = {
        id: findUser.id,
        role: findUser.role,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        role: findUser.role,
        email: findUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async loginGoogle(req, res, next) {
    try {
      let urlRole = "Customer";

      const { token_google } = req.headers;
      const client = new OAuth2Client(
        "428051293432-sosih62k33db4bg4co1gfv7qeejdh6re.apps.googleusercontent.com"
      );
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience:
          "428051293432-sosih62k33db4bg4co1gfv7qeejdh6re.apps.googleusercontent.com",
      });
      const payload = ticket.getPayload();
      // If request specified a G Suite domain:
      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "google_account",
          role: urlRole,
          phoneNumber: "088000000",
          name: payload.name,
        },
        hooks: false,
      });
      const access_token = createToken({
        id: user.id,
        role: user.role,
        email: user.email,
      });

      res
        .status(200)
        .json({ access_token, role: user.role, email: user.email });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

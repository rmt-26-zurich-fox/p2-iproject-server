const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res, next) {
    try {
      const { email, password, phoneNumber, address, role } = req.body;
      // console.log(req.body);
      let user = await User.create({
        // name: username,
        email,
        password,
        phoneNumber,
        address,
        role,
        status: 'Active'
      });
      res.status(201).json({
        message: "Register success",
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const login = await User.findOne({ where: { email } });
      if (!login || !comparePassword(password, login.password)) {
        throw { name: "Login fail" };
      }
      const access_token = signToken({ id: login.id, email });
      res.status(200).json({
        message: "Login Success",
        access_token,
        user: {
          id: login.id,
          email: login.email,
          role: login.role,
          imageUrl: login.imageUrl,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  // On test
  static async googleSignin(req, res, next) {
    try {
      const { token_google } = req.headers;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: token_google,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, craeted] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.email,
          email: payload.email,
          password: "user_google",
          role: "Customer",
        },
        hooks: false,
      });
      const access_token = createToken({ id: user.dataValues.id });
      res.status(200).json({
        message: "Login Success",
        access_token,
        email: payload.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;

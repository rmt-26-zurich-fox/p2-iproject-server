const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const login = await User.findOne({ where: { email } });
      if (!login || !comparePassword(password, login.password)) {
        throw { name: "Login fail" };
      }
      const access_token = signToken({ id: login.id, email });
      res.status(200).json({ access_token });
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

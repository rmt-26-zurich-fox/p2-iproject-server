const { verifyToken } = require("../helpers/helpers");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "NoToken" };
    }
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: user.id,
      role: user.role,
      email: user.email,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication;

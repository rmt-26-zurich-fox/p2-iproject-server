const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    let { access_token } = req.headers;
    if (!access_token) {
      throw { name: "Token Invalid" };
    }
    let payload = verifyToken(access_token);
    let login = await User.findByPk(+payload.id);
    if (!login) {
      throw { name: "Unauthorized" };
    }
    req.user = {
      id: login.id,
      email: login.email,
    };
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;

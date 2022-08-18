const { verifyingToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;

    if (!access_token) {
      throw { name: "token_notExists" };
    }
    let payload = verifyingToken(access_token);

    let user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "invalid_email/password" };
    }

    req.user = {
      id: user.id,
      role: user.role,
    };
    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

module.exports = authentication;

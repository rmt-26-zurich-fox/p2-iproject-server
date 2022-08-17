const { User } = require("../models");
const { verify } = require("../helper/token");

const authentication = async (req, res, next) => {
  try {
    const token = req.headers.access_token;

    if (!token) {
      throw { name: "invalid token" };
    }
    const verifyToken = verify(token);
    const user = await User.findByPk(verifyToken.id);

    if (!user) {
      throw { name: "not found" };
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
};

module.exports = authentication;

const { User } = require("../models");
const { verifyToken } = require("../helpers/tokenHandling");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    console.log(access_token);
    if (!access_token) {
      throw { name: "NoToken" };
    }
    
    let payload = verifyToken(access_token);
    let user = await User.findByPk(payload.id);
    if (!user) {
      throw { name: "Unauthorized" };
    }

    req.user = {
      id: user.id
    };

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authentication

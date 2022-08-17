const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {

    const { access_token } = req.headers;

    const decodedToken = verifyToken(access_token);

    const response = await User.findOne({
      where: {
        id: decodedToken.id,
      }
    });

    if(!response){
      throw { name: "Unauthorized" }
    }

    req.user = {
      id: response.id,
      email: response.email,
    }

    next();

  } catch (err) {
    next(err);
  }
}

module.exports = { 
  authentication
};
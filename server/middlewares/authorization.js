const { Cloth } = require("../models");

async function authorization(req, res, next) {
  try {
    if (req.user.role === "Admin") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;

const { Cloth } = require("../models");

async function authorization(req, res, next) {
  try {
    console.log(req.body, "ATUHORISAZTA");
    if (req.user.role === "Admin") {
      next();
    } else {
      if (req.body.payment) {
        next();
      } else {
        throw { name: "Forbidden" };
      }
    }
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;

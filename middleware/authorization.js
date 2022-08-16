const { Favourite } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { id, email } = req.user;
    const paramId = req.params.id;
    const search = await Favourite.findByPk(paramId);
    if (!search) {
      throw { name: "Not found" };
    }
    if (search.userId !== id) {
      throw { name: "Unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authorization;

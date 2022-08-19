const { User, Course } = require("../models");

const authorization = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    let course = await Course.findByPk(+courseId);
    if (!course) {
      throw { name: "NotFound" };
    }
    if (req.user.role === "Teacher") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

const authorizationStatus = async (req, res, next) => {
  try {
    if (req.user.role === "Teacher") {
      next();
    } else {
      throw { name: "Forbidden" };
    }
  } catch (error) {
    next(error);
  }
};

module.exports = { authorization, authorizationStatus };

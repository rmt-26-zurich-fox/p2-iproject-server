const { getPagination, getPagingData } = require("../helpers/pagination");
const axios = require("axios");
const { Course } = require("../models");
const { Op } = require("sequelize");

class CoursesController {
  static async fetchCourses(req, res, next) {
    try {
      const { page = 0, search } = req.query;
      const { limit, offset } = getPagination(page);

      const options = {
        limit,
        offset,
      };

      if (search) {
        options.where = {
          ...options.where,
          title: { [Op.iLike]: `%${search}%` },
        };
      }

      const data = await Course.findAndCountAll(options);
      const response = getPagingData(data, page, limit);
      res.status(200).json({
        response,
      });
    } catch (error) {
      next(error);
    }
  }

  static async fetchCoursesById(req, res, next) {
    try {
      const { courseId } = req.params;

      const data = await Course.findByPk(+courseId);
      if (!data) {
        throw { name: `NotFound` };
      } else {
        res.status(200).json({ data });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CoursesController;

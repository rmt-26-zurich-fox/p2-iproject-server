const { Service, User } = require("../models");

class ServiceController {
  static async addNewService(req, res, next) {
    try {
      const { id, email } = req.user;
      const { name, price } = req.body;

      let service = await Service.create({
        UserId: id,
        name,
        price,
      });
      res.status(201).json({
        message: `Success add new service`,
        service,
      });
    } catch (error) {
      next(error);
    }
  }
  static async fetchAdminService(req, res, next) {
    try {
      // const id = req.user.id;
      const { filter } = req.body;
      if (!filter) {
        filter = "";
      }
      let service = await Service.findAndCountAll({
        where: {
          [Op.or]: {
            title: { [Op.iLike]: `%${filter}%` },
            content: { [Op.iLike]: `%${filter}%` },
          },
          status: "Active",
          UserId: id,
        },
        order: [["id", "DESC"]],
        offset: 9 * (+page - 1),
        limit: 9,
      });
      service.totalPages = Math.ceil(+service.count / 9);
      service.currentPage = +page;
      res.status(200).json({
        message: `Success read service from user ${id} page: ${page}`,
        service,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getOneService(req, res, next) {
    try {
      const { name, serviceId } = req.params;
      let service = await Service.findByPk(serviceId);
      if (!service) {
        throw { name: "service not found" };
      }
      res.status(200).json({
        message: `Success read service from service provider ${name}`,
        service,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updateService(req, res, next) {
    try {
      const { id } = req.user;
      const { name, price } = req.body;

      let service = await Service.update(
        { name, price },
        { where: { UserId: id } }
      );
      if (!service) {
        throw { name: "service not found" };
      }
      res.status(200).json({
        message: `Success read service from service provider ${name}`,
        service,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ServiceController;

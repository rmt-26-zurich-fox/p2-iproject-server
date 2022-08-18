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
  static async fetchServiceProvider(req, res, next) {
    try {
      const id = req.params.id;
      let service = await Service.findAll({
        include: {
          model: User,
          required: true,
        },
        where: {
          UserId: id
        },
        order: [["id", "DESC"]],
      });
      res.status(200).json({
        message: `Success read service from user ${id}`,
        service,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async fetchAllServiceProvider(req, res, next) {
    try {
      let service = await User.findAll({
        attributes: ['id', 'email', 'imageUrl'],
        where: {
          role: "Service Provider",
          status: "Active",
        },
        order: [["email", "ASC"]],
      });
      // service.totalPages = Math.ceil(+service.count / 9);
      // service.currentPage = +page;
      res.status(200).json({
        message: `Success read all service provider`,
        service,
      });
    } catch (error) {
      console.log(error);
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

const { ServiceRequest, ProductRequest, User } = require("../models");

class RequestController {
  static async addService(req, res, next) {
    try {
      const { id, email } = req.user;
      const { serviceId } = req.params;

      let service = await ServiceRequest.create({
        UserId: id,
        ServiceId,
      });
      res.status(201).json({
        message: `Success add new service request`,
        service,
      });
    } catch (error) {
      next(error);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const { id, email } = req.user;
      const { productId } = req.params;

      let product = await ProductRequest.create({
        UserId: id,
        ProductId: productId,
      });
      res.status(201).json({
        message: `Success add new product request`,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  // =====================================
  static async fetchAllRequest(req, res, next) {
    try {
      const id = req.user.id;
      // const { filter } = req.body;
      // if (!filter) {
      //   filter = "";
      // }
      let service = await ServiceRequest.findAndCountAll({
        where: {
          // [Op.or]: {
          //   title: { [Op.iLike]: `%${filter}%` },
          //   content: { [Op.iLike]: `%${filter}%` },
          // },
          UserId: id,
        },
        order: [["id", "DESC"]],
        // offset: 9 * (+page - 1),
        // limit: 9,
      });
      let product = await ProductRequest.findAndCountAll({
        where: {
          // [Op.or]: {
          //   title: { [Op.iLike]: `%${filter}%` },
          //   content: { [Op.iLike]: `%${filter}%` },
          // },
          UserId: id,
        },
        order: [["id", "DESC"]],
        // offset: 9 * (+page - 1),
        // limit: 9,
      });
      // service.totalPages = Math.ceil(+service.count / 9);
      // service.currentPage = +page;
      res.status(200).json({
        message: `Success read request from user ${id}`,
        service,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = RequestController;

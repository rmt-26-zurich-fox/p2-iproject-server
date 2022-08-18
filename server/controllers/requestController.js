const {
  ServiceRequest,
  ProductRequest,
  Service,
  Product,
  User,
} = require("../models");

class RequestController {
  static async addService(req, res, next) {
    try {
      const { id, email } = req.user;
      const { ServiceId } = req.params;

      let service = await ServiceRequest.create({
        UserId: id,
        ServiceId,
      });
      res.status(201).json({
        message: `Success add new service request`,
        service,
      });
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async addProduct(req, res, next) {
    try {
      const { id, email } = req.user;
      const { ProductId } = req.params;

      let product = await ProductRequest.create({
        UserId: id,
        ProductId,
      });
      res.status(201).json({
        message: `Success add new product request`,
        product,
      });
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async cancelProduct(req, res, next) {
    try {
      const { id, email } = req.user;
      const { ProductId } = req.params;

      let product = await ProductRequest.destroy({ where: { ProductId } });
      res.status(201).json({
        message: `Success cancel product request`,
      });
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async cancelService(req, res, next) {
    try {
      const { id, email } = req.user;
      const { ServiceId } = req.params;

      let service = await ServiceRequest.destroy({ where: { ServiceId } });
      console.log(service);
      res.status(201).json({
        message: `Success cancel service request`,
      });
      next();
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  // =====================================
  static async fetchAllRequest(req, res, next) {
    try {
      const id = req.user.id;
      let service = await ServiceRequest.findAll({
        include: { model: Service, required: true },
        where: {
          UserId: id,
        },
        order: [["id", "DESC"]],
      });
      let product = await ProductRequest.findAll({
        include: { model: Product, required: true },
        where: {
          UserId: id,
        },
        order: [["id", "DESC"]],
      });
      res.status(200).json({
        message: `Success read request from user ${id}`,
        service,
        product,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = RequestController;

const { Product } = require("../models");

class ProductController {
  static async showAllProduct(req, res, next) {
    try {
      let products = await Product.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });
      res.status(200).json({
        message: "success read all products",
        products,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ProductController;

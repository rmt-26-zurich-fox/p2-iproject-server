const { Product, User } = require("../models");

class ProductController {
  static async addNewProduct(req, res, next) {
    try {
      const { id, email } = req.user;
      const { name, price, detail } = req.body;

      let product = await Product.create({
        UserId: id,
        name,
        price,
        detail,
      });
      res.status(201).json({
        message: `Success add new product`,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async fetchAllProduct(req, res, next) {
    try {
      // const id = req.user.id;
      let page = req.query.page;
      let filter = req.query.filter;
      if (!page) {
        page = 1;
      }
      if (!filter) {
        filter = "";
      }
      let product = await Product.findAndCountAll({
        include: [
          {
            model: User,
            required: true,
          },
        ],
        where: {
          [Op.or]: {
            title: { [Op.iLike]: `%${filter}%` },
            content: { [Op.iLike]: `%${filter}%` },
          },
          status: "Active",
        },
        order: [["id", "DESC"]],
        offset: 9 * (+page - 1),
        limit: 9,
      });
      product.totalPages = Math.ceil(+product.count / 9);
      product.currentPage = +page;
      res.status(200).json({
        message: `Success read product page: ${page}`,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
  static async fetchProductProvider(req, res, next) {
    try {
      const id = req.params.id;
      let product = await Product.findAll({
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
        message: `Success read product from user ${id}`,
        product,
      });
    } catch (error) {
      // console.log(error);
      next(error);
    }
  }
  static async getOneProduct(req, res, next) {
    try {
      const { name, productId } = req.params;
      let product = await Product.findByPk(productId);
      if (!product){
        throw {name: 'product not found'}
      }
      res.status(200).json({
        message: `Success read product from service provider ${name}`,
        product,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;

const { Cake } = require("../models");
const filter = require("../helper/filter");

class ProductController {
  static async getProduct(req, res) {
    let { page, name, category } = req.query;
    try {
      if (!page) {
        page = 1;
      }

      const size = 8;
      const offset = `${(page - 1) * size}`;
      const Cakes = await Cake.findAll({
        limit: size,
        offset: +offset,
        where: filter(name, category),
      });
      res.status(200).json(Cakes);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = ProductController;

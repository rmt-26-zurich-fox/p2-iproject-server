const { Product, Cart } = require("../models");

class CartController {
  static async createCart(req, res, next) {
    try {
      let UserId = req.user.id;
      let { ProductId } = req.params;

      console.log(UserId, ProductId);
      let isExist = await Cart.findOne({
        where: { UserId: UserId, ProductId: ProductId },
      });

      console.log(isExist, "=====");

      const findProduct = await Product.findByPk(ProductId);
      console.log(findProduct, "+++++++++");
      if (!findProduct) {
        throw { name: "SequelizeForeignKeyConstraintError" };
      }

      console.log(isExist);
      let updatedCart;
      if (isExist) {
        let newQuantity = isExist.quantity + 1;
        updatedCart = await Cart.update(
          { quantity: newQuantity },
          { where: { UserId: UserId, ProductId: ProductId } }
        );
        res.status(201).json({ message: "success update cart", updatedCart });
      } else {
        updatedCart = await Cart.create({ UserId, ProductId });
        res
          .status(201)
          .json({ message: "success create new cart", updatedCart });
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
    // res.send('dari cart controller');
  }

  static async getCart(req, res, next) {
    try {
      let UserId = req.user.id;
      let cart = await Cart.findAll({
        where: { UserId },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: {
          model: Product,
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      });
      res.status(200).json({ message: "success read carts", cart });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = CartController;

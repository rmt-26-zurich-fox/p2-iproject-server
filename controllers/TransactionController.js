const { Cart, Product, Transaction } = require("../models");

class TransactionController {
  static async checkout(req, res, next) {
    try {
      let UserId = req.user.id;
      let total = 0;
      let productArray = [];

      let findCart = await Cart.findAll({
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

      if (findCart.length !== 0) {
        for (let i = 0; i < findCart.length; i++) {
          total += findCart[i].Product.price * findCart[i].quantity;

          let product = {
            ProductId: findCart[i].ProductId,
            name: findCart[i].Product.name,
            price: findCart[i].Product.price,
            imageUrl: findCart[i].Product.imageUrl,
            quantity: findCart[i].quantity,
          };
          productArray.push(product);
          if (findCart[i].Product.stock < 0) {
            throw { name: "NotFound" };
          } else {
            let newStockProduct = await Product.update(
              { stock: (findCart[i].Product.stock -= findCart[i].quantity) },
              { where: { id: findCart[i].ProductId } }
            );

            let newUpdate = await Product.findByPk(findCart[i].ProductId);
            // res.status(200).json(newUpdate);
          }
        }

        let newTransaction = await Transaction.create({
          UserId,
          totalPrice: total,
          products: productArray,
        });
        await Cart.destroy({ where: { UserId } });
        res
          .status(201)
          .json({ message: "transaction success", newTransaction });
      }

      //   res.status(200).json(findCart)
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getTransaction(req, res, next) {
    try {
      let UserId = req.user.id;
      let transactions = await Transaction.findAll({ where: { UserId } });
      res
        .status(200)
        .json({ message: "success read all transactions", transactions });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async payment(req, res, next) {
    try {
      let UserId = req.user.id;
      let { id } = req.params;

      let payment = await Transaction.update({ paymentStatus: true }, { where: { id } });
      res
      .status(200)
      .json({ message: "transaction success", payment });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = TransactionController;

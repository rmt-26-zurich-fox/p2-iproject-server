const { Cake, Cart } = require("../models");
const midtransClient = require("midtrans-client");
const filter = require("../helper/filter");

class ProductController {
  static async getProduct(req, res, next) {
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
      next(error);
    }
  }

  static async addItem(req, res, next) {
    const { id } = req.user;
    const { cakeId } = req.params;
    try {
      const cake = await Cake.findByPk(+cakeId);
      const findCart = await Cart.findOne({
        where: {
          CakeId: cake.id,
          UserId: id,
        },
      });
      if (!findCart) {
        await Cart.create({
          CakeId: cake.id,
          UserId: id,
          amount: 1,
          price: cake.price,
        });
        res.status(201).json({ message: "Item added to shopping cart" });
      } else {
        throw error;
      }
    } catch (error) {
      next(error);
    }
  }

  static async getCart(req, res, next) {
    const { id } = req.user;
    try {
      const cart = await Cart.findAll({
        order: [["id", "ASC"]],
        where: {
          UserId: id,
        },
        include: Cake,
      });
      res.status(200).json(cart);
    } catch (error) {
      next(error);
    }
  }

  static async patchCart(req, res, next) {
    const { cartId } = req.params;
    const { amount } = req.body;
    try {
      const cart = await Cart.findByPk(+cartId, {
        include: Cake,
      });

      await Cart.update(
        {
          amount,
          price: amount * cart.Cake.price,
        },
        {
          where: {
            id: cartId,
          },
        }
      );

      res.status(200).json({ message: "Item updated" });
    } catch (error) {
      next(error);
    }
  }

  static async deleteItem(req, res, next) {
    const { cartId } = req.params;
    try {
      await Cart.destroy({
        where: {
          id: cartId,
        },
      });
      res.status(200).json({ message: "Item removed" });
    } catch (error) {
      next(error);
    }
  }

  static async payment(req, res, next) {
    const { id, email } = req.user;
    try {
      const cart = await Cart.findAll({
        where: {
          UserId: id,
        },
        include: Cake,
      });

      let total = 0;
      let details = [];
      cart.forEach((el) => {
        total += el.price;
        details.push({
          id: el.id,
          price: el.Cake.price,
          quantity: el.amount,
          name: el.Cake.name,
        });
      });

      let parameter = {
        transaction_details: {
          order_id: `${new Date().valueOf()}`,
          gross_amount: total,
        },
        credit_card: {
          secure: true,
        },
        item_details: details,
        customer_details: {
          email,
        },
      };
      console.log(parameter.transaction_details.order_id);
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });
      const transaction = await snap.createTransaction(parameter);
      // transaction token
      let transactionToken = transaction.token;
      res.status(200).json({ trans_token: transactionToken });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async removeCheckout(req, res, next) {
    const { id } = req.user;
    try {
      await Cart.destroy({
        where: {
          UserId: id,
        },
      });
      res.status(200).json({ message: "Checkout items removed" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProductController;

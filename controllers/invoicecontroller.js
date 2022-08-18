const midtransClient = require("midtrans-client");
const { ShoppingCart, Course } = require("../models");

class InvoiceController {
  static async checkout(req, res, next) {
    try {
      const course = await ShoppingCart.findAll({
        where: { UserId: req.user.id },
        include: Course,
      });

      let items = [];
      let totalPrice = 0;
      course.forEach((el) => {
        items.push(
          el.id,
          el.Course.title,
          el.Course.description,
          el.Course.price,
          el.Course.duration
        );
        totalPrice += el.Course.price;
      });

      let parameter = {
        transaction_details: {
          order_id: `${Math.floor(Math.random() * 100)}`,
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        item_details: [items],
        customer_details: {
          email: req.user.email,
        },
      };

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-Mp8cE9pAmg5SeRFlNV2nGd4S",
      });

      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        res.status(200).json({ transaction_token: transactionToken });
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = InvoiceController;

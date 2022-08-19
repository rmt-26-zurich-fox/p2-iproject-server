const midtransClient = require("midtrans-client");
const { User } = require("../models");

class Controller {
  static async paymentGetway(req, res, next) {
    try {
      const { amount } = req.body;
      const { id } = req.user;

      const snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-FEWBUR-wInu61A1IX6Nc0bGS",
        clientKey: "SB-Mid-client-YWMdBf27gM0fxT4O",
      });

      const findUser = await User.findByPk(id);

      const parameter = {
        transaction_details: {
          order_id:
            "order-id-" +
            Math.round(new Date().getTime() / 1000) +
            "-" +
            Math.round(Math.random() * 100),
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: findUser.username,
          // last_name: "pratama",
          email: findUser.email,
          // phone: "08111222333",
        },
      };

      const transaction = await snap.createTransaction(parameter);
      const transactionToken = transaction.token;
      console.log("transactionToken:", transactionToken);

      res.status(200).json({ transactionToken });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

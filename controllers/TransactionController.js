const { User, Cart, Product, Transaction } = require("../models");
const { Sequelize } = require("sequelize");

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
          .json({ message: "success create new transaction", newTransaction });
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
      let transactions = await Transaction.findAll({
        where: { UserId },
      });

      const totalAmount = await Transaction.findAll({
        attributes: [
          "UserId",
          [Sequelize.fn("sum", Sequelize.col("totalPrice")), "totalPriceAll"],
        ],
        where: { paymentStatus: false },
        group: ["UserId"],
      });

      // console.log(totalAmount[0].totalPriceAll, '^^^^^^^^^^^^^^');
      res.status(200).json({
        message: "success read all transactions",
        totalAmount,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async payment(req, res, next) {
    try {
      const midtransClient = require("midtrans-client");
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-ER7emIj4sd4Y_Cyz2K7_x7fX",
      });

      let {totalAmount} = req.body
      console.log(totalAmount, "#########");

      let UserId = req.user.id;
      let userEmail = req.user.email
      // const totalAmount = await Transaction.findAll({
      //   attributes: [
      //     "UserId",
      //     [Sequelize.fn("sum", Sequelize.col("totalPrice")), "totalPriceAll"],
      //   ],
      //   where: { paymentStatus: false },
      //   group: ["UserId"],
      // });

      // console.log(totalAmount.Transaction, '^^^^^^^^^^^^^^');

      let ORDERID = Math.floor(Math.random() * 1000); + `${UserId}`
      let parameter = {
        transaction_details: {
          order_id: ORDERID,
          gross_amount: totalAmount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: UserId,
          last_name: "last_name",
          email: userEmail,
          phone: "08111222333",
        },
      };

      // snap.createTransaction(parameter).then((transaction) => {
      //   // transaction token
      //   let transactionToken = transaction.token;
      //   console.log("transactionToken:", transactionToken);
      // });

      const transactionToken = await snap.createTransaction(parameter);
      console.log("transactionToken:", transactionToken)
      

      // let payment = await Transaction.update(
      //   { paymentStatus: true },
      //   { where: { UserId, paymentStatus: false } }
      // );
      res.status(201).json({ message: "transaction success", transactionToken});
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}



module.exports = TransactionController;

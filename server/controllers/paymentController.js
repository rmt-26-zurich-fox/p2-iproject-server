const midtransClient = require("midtrans-client");
const {
  User,
  Product,
  Service,
  ProductRequest,
  ServiceRequest,
} = require("../models");

class PaymentController {
  static async getBill(req, res, next) {
    const { id, email } = req.user;
    let orderId = 0

    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: "SB-Mid-server-26sPTRxaxeMr0B8vj92SAoJ2",
    });

    const requestProduct = await ProductRequest.findAll({
      include: { model: Product, required: true },
      where: { UserId: id },
    });

    const productAmount = requestProduct.reduce((accumulator, object) => {
      return accumulator + object.Product.price;
    }, 0);

    const requestService = await ServiceRequest.findAll({
      include: { model: Service, required: true },
      where: { UserId: id },
    });

    const serviceAmount = requestService.reduce((accumulator, object) => {
      return accumulator + object.Service.price;
    }, 0);

    console.log(serviceAmount + productAmount, '<<<<<<<< total bayar');

    let parameter = {
      transaction_details: {
        order_id: orderId++,
        gross_amount: serviceAmount + productAmount,
      },
      credit_card: {
        secure: false,
      },
      customer_details: {
        email: email,
      },
    };

    snap
      .createTransaction(parameter)
      .then((transaction) => {
        // transaction token
        res.status(201).json(transaction);
        let transactionToken = transaction.token;
        console.log("transactionToken:", transactionToken);
      })
      .catch((err) => console.log(err));
  }
  static notification(req, res, next) {
    let apiClient = new midtransClient.Snap({
      isProduction: false,
      serverKey: "SB-Mid-server-26sPTRxaxeMr0B8vj92SAoJ2",
      clientKey: "SB-Mid-client-kdXgIwVppvPwKCtC",
    });

    apiClient.transaction
      .notification(notificationJson)
      .then((statusResponse) => {
        let orderId = statusResponse.order_id;
        let transactionStatus = statusResponse.transaction_status;
        let fraudStatus = statusResponse.fraud_status;

        console.log(
          `Transaction notification received. Order ID: ${orderId}. Transaction status: ${transactionStatus}. Fraud status: ${fraudStatus}`
        );

        // Sample transactionStatus handling logic

        if (transactionStatus == "capture") {
          if (fraudStatus == "challenge") {
            // TODO set transaction status on your database to 'challenge'
            // and response with 200 OK
          } else if (fraudStatus == "accept") {
            // TODO set transaction status on your database to 'success'
            // and response with 200 OK
          }
        } else if (transactionStatus == "settlement") {
          // TODO set transaction status on your database to 'success'
          // and response with 200 OK
        } else if (
          transactionStatus == "cancel" ||
          transactionStatus == "deny" ||
          transactionStatus == "expire"
        ) {
          // TODO set transaction status on your database to 'failure'
          // and response with 200 OK
        } else if (transactionStatus == "pending") {
          // TODO set transaction status on your database to 'pending' / waiting payment
          // and response with 200 OK
        }
      });
  }
}

module.exports = PaymentController;

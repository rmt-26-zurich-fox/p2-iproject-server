const midtransClient = require("midtrans-client");

class PaymentController {
  static async test(req, res, next) {
    // Create Snap API instance
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: "SB-Mid-server-26sPTRxaxeMr0B8vj92SAoJ2",
    });

    let parameter = {
      transaction_details: {
        order_id: "Orderan pertama",
        gross_amount: 50000,
      },
      credit_card: {
        secure: false,
      },
      customer_details: {
        first_name: "budi",
        last_name: "pratama",
        email: "budi.pra@example.com",
        phone: "08111222333",
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
  static async notification(req, res, next) {
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

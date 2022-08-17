const midtransClient = require("midtrans-client");
const { Profile, Order } = require("../models");

class MidtransController {
    static async generateSnapToken(req, res, next) {
        try {
            const totalCostNeedToPay = req.body.totalCostNeedToPay;

            // Create Snap API instance
            let snap = new midtransClient.Snap({
                // Set to true if you want Production Environment (accept real transaction).
                isProduction: false,
                serverKey: `${process.env.SECRET_Server_Key}`
            });

            const findProfile = await Profile.findByPk(req.user.profile_id);

            let parameter = {
                "transaction_details": {
                    "order_id": `ORDERID-${Date.now()}`,
                    "gross_amount": +totalCostNeedToPay
                },
                "credit_card": {
                    "secure": true
                },
                "customer_details": {
                    "first_name": findProfile.firstName,
                    "last_name": findProfile.lastName,
                    "email": req.user.email,
                    "phone": findProfile.phoneNumber
                }
            };

            const transaction = await snap.createTransaction(parameter)
            res.status(201).json({
                message: "Success Create Token Transaction Midtrans",
                transaction
            })
        } catch (error) {
            next(error);
        }
    }

    static async updateStatusCartToPayed(req, res, next) {
        try {
            await Order.update({ orderStatus: "Payed" }, {
                where: {
                    orderStatus: "Cart",
                    ProfileId: req.user.profile_id
                }
            })

            res.status(200).json({
                message: "Paying successful!"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = MidtransController;
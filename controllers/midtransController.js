const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");
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

            const transporter = nodemailer.createTransport({
                service: "hotmail",
                auth: {
                    user: "yohkristianwibowo@outlook.com", // generated ethereal user
                    pass: `${process.env.OUTLOOK_PASSWORD}`, // generated ethereal password
                },
            });

            // send mail with defined transport object
            const mailing = await transporter.sendMail({
                from: "yohkristianwibowo@outlook.com", // sender address
                to: `${req.user.email}`, // list of receivers
                subject: "Hello you completed your midtrans payment", // Subject line
                text: "Your payment is completed, and your item will arrive shortly", // plain text body
            });

            transporter.sendMail(mailing, (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(info);
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
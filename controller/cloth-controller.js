const { Cloth, Package, User } = require("../models");
const midtransClient = require("midtrans-client");
const nodemailer = require("nodemailer");

class ClothController {
  static async showClothes(req, res, next) {
    try {
      const { id, role } = req.user;
      let query = { include: Package };
      if (role === "Customer") {
        query.where = { UserId: id };
      }
      let data = await Cloth.findAll(query);
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async addCloth(req, res, next) {
    try {
      const { UserId, PackageId, weight } = req.body;
      const pack = await Package.findByPk(PackageId);
      if (!pack) {
        throw { name: "NotFound" };
      }
      let someDate = new Date();
      let deadline = someDate.setDate(someDate.getDate() + pack.deadlineDay);
      const cloth = await Cloth.create({
        UserId,
        PackageId,
        weight,
        deadlineDate: new Date(deadline),
        totalPrice: pack.price * weight,
        status: "Pending",
        payment: "Unpaid",
      });
      res.status(201).json(cloth);
    } catch (error) {
      next(error);
    }
  }

  static async updateCloth(req, res, next) {
    try {
      const { id } = req.params;
      const { status, payment } = req.body;
      let toBeUpdate;
      if (status) {
        toBeUpdate = { status };
      } else if (payment) {
        toBeUpdate = { payment };
      }
      let updated = await Cloth.update(toBeUpdate, {
        where: { id },
        returning: true,
        plain: true,
      });

      if (status == "Done") {
        let userData = await User.findByPk(updated[1].UserId);
        const transporter = nodemailer.createTransport({
          service: "hotmail",
          auth: {
            user: "hektip@outlook.com",
            pass: "@Saw123456",
          },
        });

        const options = {
          from: "hektip@outlook.com",
          to: `${userData.email}`,
          subject: `Londreeh Notification`,
          text: `Hi ${userData.name} Your Laundry with Order Id ${id} has been done washing, kindly check your Londreeh web app :)`,
        };
        transporter.sendMail(options, (err, info) => {
          if (err) {
            console.log(err, "=================");
            return;
          } else {
            console.log(info);
          }
        });
      }

      res.status(200).json({ message: `Cloth has been updated to ${status}` });
    } catch (error) {
      next(error);
    }
  }

  static async getUser(req, res, next) {
    try {
      let user = await User.findAll({
        where: { role: "Customer" },
        attributes: ["email", "role", "id"],
      });
      res.status(200).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getPackage(req, res, next) {
    try {
      let pack = await Package.findAll();
      res.status(200).json(pack);
    } catch (error) {
      next(error);
    }
  }

  static async midtransPayment(req, res, next) {
    try {
      const { UserId, totalPrice, id } = req.body;
      let user = await User.findByPk(UserId);

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: "SB-Mid-server-vBvfIcrsF3bCEFSmxNx6Vzsl",
      });

      let parameter = {
        transaction_details: {
          order_id: `${id}`,
          gross_amount: totalPrice,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: user.name,
          // last_name: "",
          email: user.email,
          phone: user.phoneNumber,
        },
      };

      let transactionToken = await snap.createTransaction(parameter);
      // transaction token
      // let transactionToken = transaction.token;
      res.status(200).json({ midtrans_token: transactionToken.token });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClothController;

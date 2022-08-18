const { User, Profile, House, Image, HouseFacility, Facility, Category } = require("../models");
const { Op } = require("sequelize");
const nodemailer = require("nodemailer");

class Controller {
  static async getAllHouses(req, res, next) {
    try {
      const { category } = req.query;
      let option = category ? { name: { [Op.iLike]: `%${category}%` } } : null;

      const houses = await House.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Image,
            attributes: ["id", "imageUrl"],
            order: [["id", "DESC"]],
          },
          {
            model: Category,
            attributes: ["id", "name"],
            where: option,
          },
        ],
      });

      res.status(200).json(houses);
    } catch (error) {
      next(error);
    }
  }

  static async getHouseDetail(req, res, next) {
    try {
      const { houseId } = req.params;
      if (isNaN(+houseId)) {
        throw { name: "Invalid Id" };
      }

      const house = await House.findByPk(houseId, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: User,
            attributes: ["id", "username"],
          },
          {
            model: Image,
            attributes: ["id", "imageUrl"],
            order: [["id", "ASC"]],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: HouseFacility,
            attributes: ["id"],
            include: [
              {
                model: Facility,
                attributes: ["name"],
              },
            ],
          },
        ],
      });

      if (!house) {
        throw { name: "NotFound" };
      }

      res.status(200).json(house);
    } catch (error) {
      next(error);
    }
  }

  static async getAllCategories(req, res, next) {
    try {
      const categories = await Category.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });

      res.status(200).json(categories);
    } catch (error) {
      next(error);
    }
  }

  static async addHouse(req, res, next) {
    try {
      const UserId = req.user.id;
      const { name, location, price, CategoryId, FacilityId } = req.body;
      const imageUrl = req.imageUrl;
      if (!FacilityId) {
        throw { name: "SequelizeValidationError", errors: [{ message: "Facility is required" }] };
      }

      const facilities = FacilityId.split(",");

      const newHouse = await House.create({
        name,
        location,
        price,
        CategoryId,
        UserId,
      });

      facilities.forEach((el) => {
        HouseFacility.create({
          HouseId: newHouse.id,
          FacilityId: el,
        });
      });

      await Image.create({
        HouseId: newHouse.id,
        imageUrl,
      });

      res.status(201).json({ message: "New house successfully created" });
    } catch (error) {
      next(error);
    }
  }

  static async getAllFacilities(req, res, next) {
    try {
      const facilities = await Facility.findAll({
        attributes: {
          exclude: ["updatedAt", "createdAt"],
        },
      });

      res.status(200).json(facilities);
    } catch (error) {
      next(error);
    }
  }

  static async midtransHandle(req, res, next) {
    try {
      const midtransClient = require("midtrans-client");
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.midtrans_server_key,
      });

      const { amount } = req.body;
      const order = new Date().getTime();

      const UserId = req.user.id;
      const user = User.findByPk(UserId);
      const profile = Profile.findOne({ where: { UserId } });

      let parameter = {
        transaction_details: {
          order_id: order,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: profile.firstName,
          last_name: profile.lastName,
          email: user.email,
          phone: profile.phone,
        },
      };

      const transactionToken = await snap.createTransaction(parameter);

      const transporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
          user: process.env.email_username,
          pass: process.env.email_password,
        },
      });

      const mailOptions = {
        from: process.env.email_username,
        to: user.email,
        subject: "Transaction notification",
        text: `Hello, ${user.username}. You have made a transaction invoice at Serum. Thank you.`,
      };

      transporter.sendMail(mailOptions, (err) => {
        if (err) {
          return res.status(500).json({ message: "error sending mail" });
        }
      });

      res.status(200).json(transactionToken.token);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

const e = require("cors");
const { compareHash, createToken } = require("../helpers/helper");
const { User, Cart, Product } = require("../models");

class userController {
  static async adminRegister(req, res) {
    try {
      const { email, password } = req.body;

      const createdAdmin = await User.create({
        email,
        password,
        role: "admin",
      });

      res.status(201).json({
        createdAdmin: {
          email: createdAdmin.email,
          role: createdAdmin.role,
        },
      });
    } catch (error) {
      // console.log(error);
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Email must be unique" });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).json(error.errors[0].message);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async adminLogin(req, res) {
    try {
      const { email, password } = req.body;

      const loginAdmin = await User.findOne({
        where: {
          email,
        },
      });
      if (loginAdmin) {
        if (compareHash(password, loginAdmin.password)) {
          res.status(200).json({
            access_token: createToken({
              id: loginAdmin.id,
              email: loginAdmin.email,
            }),
          });
        } else {
          throw { name: "invalid" };
        }
      } else {
        throw { name: "invalid" };
      }
    } catch (error) {
      // console.log(error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json(error.errors[0].message);
      } else if (error.name === "invalid") {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async registerCustomer(req, res) {
    try {
      const { email, password } = req.body;

      const createdCustomer = await User.create({
        email,
        password,
        role: "customer",
      });

      res.status(201).json({
        createdCustomer: {
          email: createdCustomer.email,
          role: createdCustomer.role,
        },
      });
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({ message: "Email must be unique" });
      } else if (error.name === "SequelizeValidationError") {
        res.status(400).json(error.errors[0].message);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async loginCustomer(req, res, next) {
    const { email, password } = req.body;
    try {
      const findCustomer = await User.findOne({
        where: {
          email,
        },
      });

      if (!findCustomer) {
        throw { name: "invalid email/password!" };
      }

      const comparePassword = compareHash(password, findCustomer.password);
      if (!comparePassword) {
        throw { name: "invalid email/password!" };
      }

      if (findCustomer.role !== "customer") {
        throw { name: "forbidden" };
      }

      const payload = {
        id: findCustomer.id,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        findCustomer: {
          email: findCustomer.email,
          role: findCustomer.role,
        },
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        res.status(400).json(error.errors[0].message);
      } else if (error.name === "invalid") {
        res.status(401).json({ message: "Invalid email/password" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }
}

module.exports = userController;

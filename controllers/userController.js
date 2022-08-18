
const { compareHash, createToken } = require("../helpers/helper");
const { User, Cart, Product } = require("../models");
const {OAuth2Client} = require("google-auth-library");
const nodemailer = require('nodemailer')
let mailTransporter =nodemailer.createTransport({
  service:"yahoo",
  auth:{
    user:'THESOUTHFACE123@yahoo.com',
    pass:process.env.YAHOO_PASSWORD
  }
})



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
      const mailDetails = {
        from:'THESOUTHFACE123@yahoo.com',
        to: createdCustomer.email,
        subject:"Success Registering THESOUTHFACE Account",
        text :'Your account has been registered, enjoy!'
      }

      mailTransporter.sendMail(mailDetails,(err)=>{
        if(err) console.log(err,"error");
        else console.log(("success"));
      })

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
        throw { name: "No account found" };
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
      console.log(error);
      if (error.name === "SequelizeValidationError") {
        res.status(400).json(error.errors[0].message);
      } else if (error.name === "No account found") {
        res.status(401).json({ message: "No account found" });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  }

  static async googleLoginCustomer(req, res, next) {
    try {
      const { google_token } = req.body;
      const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });

      const payload = ticket.getPayload();

      const [user, created] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          email: payload.email,
          password: "passwordFromGoogle",
          role: "customer",
        },
      });

      const access_token = createToken({
        id: user.id,
      });
      res.status(200).json({
        access_token,
        user: {
          email: user.email,
          role: user.role,
          id: user.id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }


}

module.exports = userController;

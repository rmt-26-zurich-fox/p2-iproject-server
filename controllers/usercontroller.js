const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");
var nodemailer = require("nodemailer");
const { User } = require("../models");

class UserController {
  static async userRegister(req, res, next) {
    try {
      const { username, email, password, fullName, role, location } = req.body;

      var transporter = nodemailer.createTransport({
        service: "yahoo",
        auth: {
          user: "individualprojectphase2@hotmail.com",
          pass: "satu2satu2TIGA",
        },
      });

      const code = Math.floor(Math.random() * 100 + 54);
      const baseUrl = "http://localhost:3000";
      const host = req.get("host");

      // const options = {
      //   from: "individualprojectphase2@gmail.com",
      //   to: `${email}`,
      //   subject: `Email Verification`,
      //   text: `Hello, please click on the link to verify your email ${baseUrl}/verify?id=${code}`,
      // };

      // transporter.sendMail(options, (error, response) => {
      //   if (error) {
      //     console.log(error);
      //     res.end("error");
      //   } else {
      //     console.log("Message sent: " + response.message);
      //     res.end("sent");
      //   }
      // });

      // if (req.protocol + "://" + req.get("host") == "http://" + host) {
      //   console.log("Domain is matched. Information is from Authentic email");
      //   if (req.query.id == rand) {
      //     return (registerUser = await User.create({
      //       username,
      //       email,
      //       password,
      //       fullName,
      //       role,
      //       location,
      //     }));
      //     console.log("email is verified");
      //     // res.end("Email " + mailOptions.to + " is been Successfully verified");
      //   } else {
      //     console.log("email is not verified");
      //     res.end("Bad Request");
      //   }
      // } else {
      //   res.end("Request is from unknown source");
      // }

      const registerUser = await User.create({
        username,
        email,
        password,
        fullName,
        location,
      });

      res.status(201).json({
        message: `User has been registered`,
        id: registerUser.id,
        email: registerUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { name: "Invalid email/password" };
      }
      const comparePassword = compareHash(password, findUser.password);
      if (!comparePassword) {
        throw { name: "Invalid email/password" };
      }
      const payload = {
        id: findUser.id,
      };
      const access_token = createToken(payload);
      res.status(200).json({
        access_token: access_token,
        email: findUser.email,
        role: findUser.role,
        id: findUser.id,
      });

      req.user = {
        id: findUser.id,
        role: findUser.role,
        email: findUser.email,
      };
    } catch (error) {
      if (error.name === "Invalid email/password") {
        res.status(401).json({ message: `Invalid email/password` });
      } else res.status(500).json({ message: `Internal server error` });
    }
  }
}

module.exports = UserController;

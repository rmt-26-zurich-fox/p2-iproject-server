const { User } = require("../models");
const { compareHash, createToken } = require("../helpers/helpers");
const axios = require("axios");

class UserController {
  static async createUser(req, res, next) {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const verifyEmail = await axios.get(
        `https://emailvalidation.abstractapi.com/v1/?api_key=1643f60bd7484bab980621ea880f57fd&email=${email}`
      );
      if (verifyEmail.data.quality_score * 10 <= 5) {
        throw { name: `not a valid email` };
      }
      const verifyPhone = await axios.get(
        `https://phonevalidation.abstractapi.com/v1/?api_key=0941b288e2894e4fbfb51e876d696ad1&phone=+62${phoneNumber.slice(
          1
        )}`
      );
      console.log(verifyPhone.data);
      console.log(verifyPhone.data.location, verifyPhone.data.valid);
      if (
        verifyPhone.data.location !== "Indonesia" ||
        !verifyPhone.data.valid
      ) {
        throw { name: `not a valid phonenumber` };
      }
      let urlRole = "Customer";
      if (password === "Admin") {
        urlRole = "Admin";
      }
      let newUser = await User.create({
        name,
        email,
        password,
        role: urlRole,
        phoneNumber,
      });
      res.status(201).json({
        message: `success create user`,
        email: newUser.email,
      });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: { email },
      });

      if (!findUser) {
        throw { name: "invalid_email/password" };
      }
      const comparePass = compareHash(password, findUser.password);
      if (!comparePass) {
        throw { name: "invalid_email/password" };
      }

      const payload = {
        id: findUser.id,
        role: findUser.role,
      };
      const access_token = createToken(payload);

      res.status(200).json({
        access_token,
        role: findUser.role,
        email: findUser.email,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;

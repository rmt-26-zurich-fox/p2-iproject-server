const {
  User,
  Doctor,
  DoctorSpecialization,
  FavouriteDoctor,
} = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class DoctorController {
  static async doctorRegister(req, res, next) {
    try {
      const { email, password } = req.body;

      let data = await User.create({
        email,
        password,
        role: "Doctor",
      });
      res.status(201).json({
        message: `success create doctor with id ${data.id} and email ${data.email}`,
        id: data.id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async doctorLogin(req, res, next) {
    try {
      const { email, password } = req.body;

      const findUser = await User.findOne({ where: { email } });
      if (!findUser) {
        throw { name: "invalid_email/password" };
      }
      const comparePassword = compareHash(password, findUser.password);
      if (!comparePassword) {
        throw { name: "invalid_email/password" };
      }

      const payload = {
        id: findUser.id,
      };
      const getToken = createToken(payload);

      res.status(200).json({
        access_token: getToken,
        role: findUser.role,
        username: findUser.username,
        message: "Success Login",
      });
    } catch (error) {
      next(error);
    }
  }

  static async addDoctorSpecializations(req, res, next) {
    try {
      const {
        userId,
        specialization_one,
        specialization_two,
        specialization_three,
        specialization_four,
      } = req.body;
      const createDoctorSpecializations = await DoctorSpecialization.create({
        userId,
        specialization_one,
        specialization_two,
        specialization_three,
        specialization_four,
      });
      res
        .status(201)
        .json({ message: "Success create Doctor Specializations" });
    } catch (error) {
      next(error);
    }
  }

  static async getDoctor(req, res, next) {
    try {
      const getDoctor = await Doctor.findAll({ where: { status: "Active" } });
      res.status(200).json({ getDoctor });
    } catch (error) {
      next(error);
    }
  }

  static async statusDoctor(req, res, next) {
    try {
      const { status } = req.body;
      const changeStatusDoctor = await Doctor.update(
        { status },
        { where: { id: req.user.id } }
      );
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  static async getFavourite(req, res, next) {
    try {
      const getFavourite = await FavouriteDoctor.findAll();
      res.status(200).json({ getFavourite });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = DoctorController;

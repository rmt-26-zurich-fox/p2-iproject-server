const {
  User,
  Doctor,
  DoctorSpecialization,
  FavouriteDoctor,
  Profile,
} = require("../models");
const { compareHash } = require("../helpers/bcrypt");
const { createToken } = require("../helpers/jwt");

class DoctorController {
  static async addDoctorSpecializations(req, res, next) {
    try {
      const {
        userId,
        specialization_one,
        specialization_two,
        specialization_three,
        specialization_four,
      } = req.body.data;

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
      const getDoctor = await Doctor.findAll({
        include: {
          model: User,
          include: [{ model: Profile }, { model: DoctorSpecialization }],
        },
        where: { status: "Online" },
      });
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
        { where: { userId: req.user.id } }
      );
      res.status(200).json({});
    } catch (error) {
      next(error);
    }
  }

  static async getFavourite(req, res, next) {
    try {
      const getFavourite = await FavouriteDoctor.findAll({
        include: {
          model: User,
          include: [{ model: Profile }, { model: DoctorSpecialization }],
        },
        order: [["vote", "DESC"]],
        limit: 3,
      });
      res.status(200).json({ getFavourite });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async addFavouriteDoctor(req, res, next) {
    try {
      const { doctorId } = req.params;
      console.log(req);
      const getDoctor = await Doctor.findOne({ where: { userId: doctorId } });
      if (!getDoctor) {
        throw { name: "NotFound" };
      }
      const addFavourite = await FavouriteDoctor.increment("vote", {
        by: 1,
        where: { doctorId },
      });
      res.status(200).json({ message: "Success like doctor" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = DoctorController;

const { Cloth, Package } = require("../models");

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
      });
      res.status(201).json(cloth);
    } catch (error) {
      next(error);
    }
  }

  static async updateCloth(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      let updated = await Cloth.update(
        { status },
        {
          where: { id },
        }
      );
      res.status(200).json({ message: `Cloth has been updated to ${status}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ClothController;

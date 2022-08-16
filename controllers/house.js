const { House, Image, HouseFacility, Facility, Category } = require("../models");

class Controller {
  static async getHouseData(req, res, next) {
    try {
      const houses = await House.findAll({
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        include: [
          {
            model: Image,
            attributes: ["id", "imageUrl"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
        order: [["name"]],
      });

      res.status(200).json({ houses });
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
            model: Image,
            attributes: ["id", "imageUrl"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
          {
            model: HouseFacility,
            attributes: ['id'],
            include: [
              {
                model: Facility,
                attributes: ['name']
              }
            ],
          }
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
}

module.exports = Controller;

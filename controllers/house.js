const { User, House, Image, HouseFacility, Facility, Category } = require("../models");

class Controller {
  static async getAllHouses(req, res, next) {
    console.log("masuk");
    try {
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
      console.log(error);
      next(error);
    }
  }

  static async addHouse(req, res, next) {
    try {
      const UserId = req.user.id;
      const { name, location, price, CategoryId, FacilityId } = req.body;
      const imageUrl = req.imageUrl;
      console.log(imageUrl);

      // if (!FacilityId.length) {
      //   throw { name: "SequelizeValidationError", errors: [{ message: "Facility is required" }] };
      // }

      const newHouse = await House.create({
        name,
        location,
        price,
        CategoryId,
        UserId,
      });

      // FacilityId.forEach((el) => {
      //   HouseFacility.create({
      //     HouseId: newHouse.id,
      //     FacilityId: el,
      //   });
      // });

      await Image.create({
        HouseId: newHouse.id,
        imageUrl,
      });

      res.status(201).json({ message: "New house successfully created" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = Controller;

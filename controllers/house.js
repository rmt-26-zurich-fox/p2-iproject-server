const { House, Image, HouseFacility, Facility, Category } = require("../models");

class Controller {
  static async getHouseData(req, res, next) {
    try {
      const houses = await House.findAll({
        attributes: {
          exclude: ['createdAt', 'updatedAt']
        },
        include: [ 
          {
            model: Image,
            attributes: ['id', 'imageUrl']
          },
          {
            model: Category,
            attributes: ['id', 'name']
          }
        ],
        order: [['name']]
      });

      res.status(200).json({ houses });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

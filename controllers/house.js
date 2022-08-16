const {House} = require('../models')

class Controller {
  static async getHouseData(req, res, next) {
    try {
      const userId = req.user.id;
    } catch (error) {
      next(error)
    }
  }
}

module.exports = Controller
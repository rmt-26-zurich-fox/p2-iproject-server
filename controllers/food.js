const { getPagination, getPagingData } = require('../helper/helper');
const { Food } = require('../models')

class Controller {
    static async getFood(req, res, next) {
        try {
            const { page, size } = req.query;
            let reg = new RegExp('^[0-9]*$');
            if (reg.test(page) == false || page <= 0) throw `notFound`
            const { limit, offset } = getPagination(page, size)
            const food = await Food.findAndCountAll({ limit, offset })
            const response = getPagingData(food, page, limit)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller
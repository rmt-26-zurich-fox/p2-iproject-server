const { PopularLocation, SavedLocation, User } = require('../models')

class PopularLocationController {
    static async readPopularLocation(req, res, next) {
        try {
            let locations = await PopularLocation.findAll({
                order: [['id', 'asc']],
            })
            res.status(200).json({
                locations
            })
        } catch (error) {
            next(error)
        }
    }

    static async readPopularLocationById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let popularId = req.params.popularId

            if (reg.test(popularId) == false) throw { name: 'NotFound' }

            let product = await Product.findByPk(+popularId)

            if (!product) throw { name: 'NotFound' }

            res.status(200).json({
                message: 'Success read product',
                product
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PopularLocationController
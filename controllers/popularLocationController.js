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
        } catch (error) {
        }
    }
}

module.exports = PopularLocationController
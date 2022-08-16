const {Art} = require("../models")

class Controller {

    static async arts(req, res, next){
        try {
            let response = await Art.findAll()

            res.status(200).json(
                response
            )
        } catch (error) {
            next()
        }
    }
}

module.exports = Controller
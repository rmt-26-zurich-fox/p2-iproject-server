const { SavedLocation } = require('../models')

const authorization = async (req, res, next) => {
    try {
        let savedId = +req.params.id

        let saved = await SavedLocation.findByPk(savedId)

        if (!saved) throw { name: "NotFound" }

        if (saved.UserId == req.user.id) next()

        else throw { name: 'Forbidden' }

    } catch (error) {
        next(error)
    }
}


module.exports = { authorization }
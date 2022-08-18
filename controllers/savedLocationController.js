const { PopularLocation, SavedLocation, User } = require('../models')
const axios = require("axios");

class SavedLocationController {
    static async createSavedLocation(req, res, next) {
        try {
            let location = req.body.name
            let [saved, created] = await SavedLocation.findOrCreate({
                where: { name: location },
                where: { name: location, UserId: +req.user.id },
                defaults: {
                    name: location,
                    UserId: +req.user.id
                }
            })

            if (!created) throw { name: 'already_saved' }

            res.status(201).json({
                message: 'Success saved new location',
                saved
            })
        } catch (error) {
            next(error)
        }
    }

    static async readSavedLocation(req, res, next) {
        try {
            let saved = await SavedLocation.findAll({
                order: [['id', 'desc']],
                where: {
                    UserId: +req.user.id
                }
            })
            res.status(200).json({
                saved
            })
        } catch (error) {
            next(error)
        }
    }

    static async readSavedWeatherById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let savedId = req.params.savedId

            if (reg.test(savedId) == false) throw { name: 'NotFound' }

            let saved = await SavedLocation.findByPk(+savedId)

            if (!saved) throw { name: 'NotFound' }

            let weather = await axios({
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: { q: `${saved.name}`, days: 3 },
                headers: {
                    'X-RapidAPI-Key': '49606f27ffmsh8e7eab91839726ep11ea8cjsn70520c70fe2f',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            });

            res.status(200).json(
                weather.data
            )
        } catch (error) {
            next(error)
        }
    }

    static async deleteSavedLocationById(req, res, next) {
        try {
            let reg = new RegExp('^[0-9]*$')
            let savedId = req.params.savedId

            if (reg.test(savedId) == false) throw { name: 'NotFound' }

            let saved = await SavedLocation.findByPk(+savedId)

            if (!saved) throw { name: 'NotFound' }

            await SavedLocation.destroy({
                where: {
                    id: savedId
                }
            })

            res.status(200).json({
                message: `Saved Location with id ${saved.id} success to delete`
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = SavedLocationController
const { PopularLocation, SavedLocation, User } = require('../models')
const axios = require("axios");

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

            let popular = await PopularLocation.findByPk(+popularId)

            if (!popular) throw { name: 'NotFound' }

            let currentWeather = await axios({
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/current.json',
                params: { q: `${popular.name}` },
                headers: {
                    'X-RapidAPI-Key': '49606f27ffmsh8e7eab91839726ep11ea8cjsn70520c70fe2f',
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
                }
            });

            res.status(200).json(
                currentWeather.data
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = PopularLocationController
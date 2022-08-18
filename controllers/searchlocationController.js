const axios = require("axios");

class SearchLocationController {
    static async readWeather(req, res, next) {
        try {
            let location = req.body.name

            let weather = await axios({
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: { q: `${location}`, days: 3 },
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
}

module.exports = SearchLocationController
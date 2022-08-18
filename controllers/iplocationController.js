const axios = require("axios");
const getIP = require('ipware')().get_ip;

class IPLocationController {
    static async readWeather(req, res, next) {
        try {
            let getIp = getIP(req);
            let ipAdress = getIp.clientIp

            let { data } = await axios.get(`https://ipgeolocation.abstractapi.com/v1/?api_key=d0512eb3999d48db940df45b98de73a4&ip_address=${ipAdress}`)

            let weather = await axios({
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: { q: `${data.city}`, days: 3 },
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

module.exports = IPLocationController
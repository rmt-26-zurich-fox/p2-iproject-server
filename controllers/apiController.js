const newsAxios = require('../apis/newsApi')
const timeAxios = require('../apis/timeApi')
const weatherAxios = require('../apis/weatherApi')


class ApiController {
    static async getNews(req, res, next) {
        try {
            const key = process.env.NEWS_KEY
            const news = await newsAxios({
                method: 'GET',
                url: `/news?access_key=549cb506ccc1d66ddc4d43620bab0ebc&categories=health&languages=en&limit=10`
            })

            res.status(200).json(news.data)

        } catch (error) {
            console.log(error)
        }
    }

    static async getTime(req, res, next) {
        try {
            const times = await timeAxios({
                method: 'GET',
                url: '/Time/current/zone?timeZone=Asia/Bangkok'
            })

            res.status(200).json(times.data)

        } catch (error) {
            console.log(error)
        }
    }

    static async getWeather(req, res, next) {
        try {
            const weathers = await weatherAxios({
                method: 'GET',
                url: '/current',
                params: {lat: '-6.29012', lon: '106.76912'},
                headers: {
                    'X-RapidAPI-Key': 'd6b2e3e54bmsh792f65532eb016ap198d6bjsne0869b5dbfa2',
                    'X-RapidAPI-Host': 'weatherbit-v1-mashape.p.rapidapi.com'
                }
            })
            res.status(200).json(weathers.data)
        } catch (error) {
           console.log(error) 
        }
    }

    
}

module.exports = ApiController
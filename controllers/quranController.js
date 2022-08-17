const axios = require('axios')
const baseUrl =  "https://quran-endpoint.vercel.app/"

class Controller {
  static async allSurah(req, res) {
    try {
      const fullQuran = await axios({
        method: 'GET',
        url: baseUrl + 'quran'
      })
      res.status(200).json(fullQuran.data)
    } catch (error) {
      res.status(500).json({status: '500', message: 'Internal server error'})
    }
  }
}

module.exports = Controller
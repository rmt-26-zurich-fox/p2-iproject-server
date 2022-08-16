const axios = require('axios')

class Controller {
    static async getLocation(req, res, next) {
        try {
            const { page, category } = req.query
            if (page > 0) {
                page = page * 8
            }
            const { data } = await axios({
                url: 'https://dev.farizdotid.com/api/purwakarta/wisata',
                method: 'get'
            })

            let newData = []
            if (category) {
                data.wisata = data.wisata.filter((el) => {
                    return el.kategori === `${category}`
                })
            }
            for (let i = page; i < data.wisata.length; i++) {
                if (newData.length < 8) {
                    newData.push(data.wisata[i])
                }
            }
            res.status(200).json({ data: newData, page: Math.ceil(data.wisata.length / 8) })
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = Controller
const axios = require("axios"); 

class ApiController {

    static async getSongs(req, res, next) {
        try {
            const { search } = req.query;
            let getSongs = await axios({
                url: "http://api.genius.com/search?q=" + search,
                method: "get",
                headers: {
                    Authorization: process.env.API_GENIUS_KEY
                }
            });
            const data = getSongs.data.response.hits.map(el => { return el });
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

}

module.exports = ApiController;
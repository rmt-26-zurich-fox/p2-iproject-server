const { default: axios } = require("axios");
const {Art} = require("../models")

class Controller {

    static async arts(req, res, next){
        try {
            if(+req.user.age < 18){
                throw({name: "restricted"})
            }
            let {data} = await axios.get("https://danbooru.donmai.us/posts.json?login=brisket12688&api_key=FdwzSc7TPeqVHkKL7cuQXWkx")
            let response = data.map(el => {
                return {
                  imageUrl: el.file_url,
                  createdAt: new Date(),
                  updatedAt: new Date()
                }
               })
            res.status(200).json(
                response
            )
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller
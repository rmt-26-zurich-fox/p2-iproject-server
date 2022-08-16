const { verifyJwt } = require("../helper/hashJwt")
const {User} = require("../models")

let auth = async (req, res, next) => {
    try {
        let {access_token} = req.headers
        if(!access_token){
            throw({name: `Unauthorized`})
        }

        let payload = verifyJwt(access_token)
        if(!payload){
            throw({name: `Unauthorized`})
        }

        let foundUser = await User.findByPk(+payload.id)
        if(!foundUser) {
            throw({name: `Unauthorized`})
        }
        req.user = {
            id: foundUser.id
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {auth}
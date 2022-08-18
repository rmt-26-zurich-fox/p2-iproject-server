const { verifyJwt } = require("../helper/hashJwt")
const {User} = require("../models")

let auth = async (req, res, next) => {
    try {
        let {access_token} = req.headers
        if(!access_token){
            throw({name: `NoToken`})
        }

        let payload = verifyJwt(access_token)
        if(!payload){
            throw({name: `NoToken`})
        }

        let foundUser = await User.findByPk(+payload.id)
        if(!foundUser) {
            throw({name: `NoToken`})
        }
        req.user = {
            id: foundUser.id,
            age: foundUser.age
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = {auth}
const { verifyToken } = require('../helpers/token')
const { User } = require('../models')

const checkLogin = async (req, res, next) => {
    try {
        let {access_token} = req.headers
        if (!access_token) {
            throw {name: "No Token"}
        }
        
        let payload = verifyToken(access_token)
        let user = await User.findByPk(payload.id)

        if(!user){
            throw {name: "Unauthorized"}
        }
        req.user = {
            id: user.id,
            role: user.role,
            username: user.username
        }
        console.log(req.user)
        next()

    } catch (error) {
        next(error)
    }
}

module.exports = { checkLogin }
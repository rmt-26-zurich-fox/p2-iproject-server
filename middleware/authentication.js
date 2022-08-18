const { verifytoken } = require('../helpers/jwt');
const { User } = require('../models');


const authentication = async (req, res, next) => {
    try {
        let { access_token } = req.headers
        if (!access_token) throw { name: "noToken" }

        let payload = verifytoken(access_token)
        let user = await User.findByPk(payload.id)
        if (!user) throw { name: "Unauthorized" }

        req.user = {
            id: user.id
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = authentication
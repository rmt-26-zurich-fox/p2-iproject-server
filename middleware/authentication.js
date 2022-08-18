const { verifyToken } = require('../helper/helper')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        // 401 - Unauthorized
        // 403 - Forbidden
        const { access_token } = req.headers
        if (!access_token) throw { name: "noToken" }
        const payload = verifyToken(access_token)
        const currentUser = await User.findByPk(+payload.id)
        if (!currentUser) throw { name: "Unauthorized" }

        req.currentUser = {
            id: currentUser.id,
            name: currentUser.username,
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authentication }
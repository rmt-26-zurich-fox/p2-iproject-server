const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {

    const { access_token } = req.headers

    try {

        if(!access_token) throw {name: 'NoToken'}

        const payload = verifyToken(access_token)

        const user = await User.findByPk(payload.id)

        if(!user) throw {name: 'Unauthorized'}

        req.user = {

            id: user.id

        }

        next()
        
    } catch (error) {

        console.log(error)
        
    }
}

module.exports = {
    authentication
}
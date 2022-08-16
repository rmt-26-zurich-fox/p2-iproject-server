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
        next(error)
        
    }
}

const authorization = async(req, res, next) => {

    const { id } = req.params

    try {
        
        const quote = await Post.findByPk(id)

        if(!quote) throw {name: 'Not Found'}

        if(quote.UserId === req.user.id){

            next()

        }else {

                throw {name: 'Forbidden'}
        }

    } catch (error) {

        console.log(error)
        next(error)
        
    }
}

module.exports = {
    authentication
}
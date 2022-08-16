

const { User } = require('../models')
const { sign, verify} = require('jsonwebtoken')

const authentication = async(req, res , next) =>{
    try {
        const {access_token} = req.headers
        const decoded = verify(access_token, process.env.SECRET_KEY)
        if(!decoded){
            throw ({message: "Invalid Token"})
        }else{
            const user = await User.findOne({where: {
                id: decoded.id
            }})
            req.user = {
                id: user.id,
            }
            next()
        }
    } catch (err) {
        next(err)
    }
}


module.exports = authentication
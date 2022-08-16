const { hashSync } = require("bcryptjs")
const { sign, verify} = require('jsonwebtoken')
const { User } = require('../models')

class Controller{
    static async register(req, res, next){
        try {
            let { username, email, password, phoneNumber, address} = req.body
            const user = await User.create({ username, email, password: password, phoneNumber, address})
            console.log(user.dataValues)
                let payload = {
                    id: user.id,
                }
                const token = sign(payload,  process.env.SECRET_KEY, {
                    expiresIn:'5h'
                })
            
            res.status(201).json({
                id: user.id,
                email: user.email,
                access_token: token,
                message: "Thank You For Joining Us!"
            })

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async login (req,res,next){
        try {
            
        } catch (err) {
            
        }
    }
}

module.exports = Controller
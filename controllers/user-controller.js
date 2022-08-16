const { comparePassword } = require('../helpers/bcrypt')
const { createToken } = require('../helpers/jwt')
const { User, Post } = require('../models')

module.exports = class UserController {

    static  async userRegister(req, res, next){

        const { username, email, password, phoneNumber, address } = req.body

        try {
            
            let user = await User.create({username, email, password, role: 'staff', phoneNumber, address})

            res.status(201).json({
                message: 'Success create new user',
                user
            })

        } catch (error) {

            console.log(error)
            
        }
    }
    
}
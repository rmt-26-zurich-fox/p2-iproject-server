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
            next(error)
            
        }
    }

    static async userLogin(req, res, next){

        const { email, password } = req.body

        try {

            const user = await User.findOne({
                where: {
                    email
                }
            })

            if(!user) throw {name: 'Invalid email/password'}

            const compare = comparePassword(password, user.password)

            if(!compare) throw {name: 'Invalid email/password'}

            const payload = {

                id: user.id

            }

            const access_token = createToken(payload)

            res.status(201).json({
                access_token,
                username: user.username,
                role: user.role,
                email
            })
            
        } catch (error) {

            console.log(error)
            next(error)
            
        }
    }
    
}
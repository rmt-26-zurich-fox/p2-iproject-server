const { Category, Product, User } = require('../models')
const { hashPassword, compareHash } = require('../helpers/bcrypt')
const { createToken, verifyToken } = require('../helpers/jwt')

class UserController {
    static async createUsers(req, res, next) {
        try {
            let { email, password, phoneNumber, location } = req.body
            let user = await User.create({ email, password, phoneNumber, location })
            res.status(201).json({
                message: 'Success create new user'
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController
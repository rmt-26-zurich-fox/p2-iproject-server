const { User, Favorite } = require('../models')
const axios = require('axios')
const { verifyPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')

class Controller {
    static async register(req, res, next) {
        try {
            const { username, email, password } = req.body
            const data = await User.create({ username, email, password })
            res.status(201).json({ data })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            console.log(email, password)
            const data = await User.findOne({
                where: {
                    email: email
                }
            })
            if (!data) {
                throw { name: "invalidInput" }
            }
            
            const isValid = verifyPassword(password, data.password)
            if (!isValid) {
                throw { name: "invalidInput" }
            }

            const access_token = signToken({ id: data.id, data: data.email })

            res.status(200).json({ access_token })

        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = Controller
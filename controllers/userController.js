const { Category, Product, User } = require('../models')
const { hashPassword, compareHash } = require('../helpers/bcrypt')
const { createToken, verifyToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')


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

    static async loginUsers(req, res, next) {
        try {
            const { email, password } = req.body

            if (!email || !password) throw { name: "EmailPassEmpty" }

            const findUser = await User.findOne({
                where: {
                    email,
                },
            })

            if (!findUser) throw { name: 'invalid_email/password' }

            const comparePass = compareHash(password, findUser.password)

            if (!comparePass) throw { name: 'invalid_email/password' }

            const payload = {
                id: findUser.id,
            }

            const access_token = createToken(payload)
            res.status(200).json({
                access_token: access_token, id: findUser.id, email: findUser.email, location: findUser.location
            })
        } catch (error) {
            next(error)
        }
    }

    static async googleSignInCustomer(req, res, next) {
        try {
            const { token_google } = req.headers

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    email: payload.email,
                    password: "password_google",
                    phoneNumber: "Google_phone_number",
                    location: "Jakarta"
                },
                hooks: false,
            })

            const access_token = createToken({ id: user.id })
            res.status(200).json({
                access_token: access_token, id: user.id, email: user.email, location: user.location
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController
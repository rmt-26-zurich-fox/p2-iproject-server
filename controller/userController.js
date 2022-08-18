const { User, Favorite } = require('../models')
const axios = require('axios')
const { verifyPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library');

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
            next(err)
        }
    }

    static async googleSignIn(req, res, next) {
        try {
            const { token_google } = req.headers
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.CLIENT_ID
            });
            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email,
                },
                defaults: {
                    username: payload.name,
                    password: 'login_via_email',
                },
            });
            const access_token = signToken({ id: user.id, data: payload.email })
            res.status(200).json({ access_token })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller
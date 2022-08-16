const { compare, createToken } = require('../helper/helper')
const { OAuth2Client } = require('google-auth-library');
const { User } = require('../models')

class Controller {
    static async register(req, res, next) {
        try {
            // 201
            let { username, email, password } = req.body
            let user = await User.create({ username, email, password })
            res.status(201).json({ message: "Success register", user: user.name })
        } catch (error) {
            // 400 & 500
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            // 200
            const { email, password } = req.body
            if (!email || !password) throw { name: "invalid_email/password" }
            const find = await User.findOne({ where: { email } })
            if (!find) throw { name: "invalid_email/password" }
            const comparePassword = compare(password, find.password)
            if (!comparePassword) throw { name: "invalid_password" }
            const payload = {
                id: find.id
            }
            res.status(200).json({ access_token: createToken(payload), id: find.dataValues.id, email: find.dataValues.email, username: find.dataValues.username })
        } catch (error) {
            // 401 & 500
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { token_google } = req.headers
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.CLIENT_ID,
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "google_login"
                },
                hooks: false
            });
            const access_token = createToken({ id: user.id })
            res.status(200).json({ access_token, id: user.dataValues.id, username: user.dataValues.username, role: user.dataValues.role })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller
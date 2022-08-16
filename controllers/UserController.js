const { User, Bookmark } = require('../models');
const axios = require('axios');
const { verifypassword } = require('../helpers/password');
const { generateToken } = require('../helpers/jwt');


class UserController {
    static async postRegister(req, res, next) {
        try {
            const { username, email, password } = req.body
            let data = await User.create({ username, email, password, role: 'customer' })
            res.status(201).json({
                message: `Success create ${data.email}`
            })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })
        }
    }
    static async postLogin(req, res, next) {
        try {
            const { email, password } = req.body
            if (!email || !password) throw { name: "Bad Request" }
            const findUser = await User.findOne({
                where: {
                    email
                }
            })
            if (!findUser) throw { name: "InvalidInput" }
            const validPassword = verifypassword(password, findUser.password)
            if (!validPassword) throw { name: "InvalidInput" }

            const payload = {
                id: findUser.id
            }
            const access_token = generateToken(payload)

            res.status(200).json({
                access_token: access_token
            })

        } catch (error) {
            if (error.name === 'Bad Request') {
                res.status(401).json({ message: "Please Login" })
            } else if (error.name === 'InvalidInput') {
                res.status(403).json({ message: "Invalid email/password" })
            } else {
                res.status(500).json({ message: "Internal server error" })
            }
        }
    }
    static async loginGoogle(req, res, next) {
        try {
            const token = req.headers.token_google
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: 252191571410 - tsigtbp39rp8th3iglp06apjftqmfc4k.apps.googleusercontent.com,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: 'GOOGLE',
                    role: 'customer'
                },
                hook: false
            })

            const access_token = generateToken({ id: user.id })
            res.status(200).json({ access_token: access_token })
        } catch (error) {
            res.status(500).json({ message: "Internal server error" })

        }
    }


}

module.exports = UserController
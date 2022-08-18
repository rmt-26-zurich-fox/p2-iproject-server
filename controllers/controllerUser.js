const { makeJwt } = require("../helper/hashJwt")
const { verifyPass } = require("../helper/hashPass")
const { OAuth2Client } = require('google-auth-library');
const { User } = require("../models")

class Controller {

    static async register(req, res, next) {
        try {
            let { email, password, username, age } = req.body

            let newUser = await User.create({ email, password, username, age })

            res.status(201).json({
                msg: `Hooorayyy... your account has been made`
            })
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body

            let userLogin = await User.findOne({ where: { email: email } })
            if (!userLogin) {
                throw ({ name: `Invalid email or password` })
            }

            let passwordSync = verifyPass(password, userLogin.password)

            if (!passwordSync) {
                throw ({ name: `Invalid email or password` })
            }

            let payload = {
                id: userLogin.id,
                email: userLogin.email
            }

            let access_token = makeJwt(payload)

            res.status(200).json({
                msg: `Yahalo... ${userLogin.username}`,
                access_token,
                age: userLogin.age
            })
        } catch (error) {
            next(error)
        }
    }

    static async googlelogin(req, res, next) {
        try {
            const { access_token } = req.headers

            const client = new OAuth2Client(process.env.clientId);

            const ticket = await client.verifyIdToken({
                idToken: access_token,
                audience: process.env.clientId,
            });

            const payload = ticket.getPayload();

            let [user, created] = await User.findOrCreate({
                where: {email: payload.email},
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    age: 17,
                    password: "PasswordFromGoogle"
                },
                hooks: false
            })
            
            let token = makeJwt({
                id: user.id
            })

            res.status(200).json({
                access_token: token, user
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller
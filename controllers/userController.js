let {Item, Supplier, User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {createToken} = require('../helpers/token')
const {OAuth2Client} = require('google-auth-library')

class UserController {
    static async registerUser(req, res, next) {
        try {
            const {username, email, password, role = "admin", phoneNumber, address} = req.body
            const createUser = await User.create({
                username, email, password, role: role, phoneNumber, address
            })

            res.status(201).json({
                message: `user with username ${createUser.username} email ${createUser.email} has been created`
            })
        } catch (error) {
            next(error)
        }
    }

    static async loginUser(req, res, next) {
        try {
            const {email, password} = req.body
            const findUser = await User.findOne({
                where: {
                    email
                }
            })
            if (!findUser) {
                throw {name: "Invalid email or password, please check again"}
            }
            const checkPassword = comparePassword(password, findUser.password)
            if(!checkPassword) {
                throw {name: "Invalid email or password, please check again"}
            }

            const payload = {
                id: findUser.id
            }
            const token = createToken(payload)

            res.status(200).json({token: token, userName: findUser.username, role: findUser.role, userId: findUser.id})
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const token_google = req.headers.token_google

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            const payload = ticket.getPayload()

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email,
                    username: payload.name
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "ini_dari_google",
                    role: "customer",
                    phoneNumber: "ini_dari_google",
                    address: "ini_dari_google"
                },
                hooks: false
            })
            const token = createToken({id: user.id})
            res.status(200).json({token, userName: payload.name, role: "customer", userId: user.id})

        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController
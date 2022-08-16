const { makeJwt } = require("../helper/hashJwt")
const { verifyPass } = require("../helper/hashPass")
const { User } = require("../models")

class Controller {

    static async register(req, res, next) {
        try {
            let { email, password, username } = req.body

            let newUser = await User.create({ email, password, username })

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
                access_token
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller
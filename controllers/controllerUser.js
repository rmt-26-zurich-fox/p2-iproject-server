const {User} = require("../models")

class Controller {

    static async register(req, res, next){
        try {
            let {email, password, username} = req.body

            let newUser = await User.create({email, password, username})

            res.status(201).json({
                msg: `Hooorayyy... your account has been made`
            })
        } catch (error) {
            next(error)
        }
    }
}
module.exports = Controller
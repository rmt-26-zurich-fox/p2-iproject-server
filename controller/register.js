const { User } = require("../models");

class Register {
    static async postRegister(req, res, next) {
        try {
            let { email, username, password } = req.body;
            email = email.toLowerCase();
            const findUser = await User.findOne({ where: { email } });
            if (findUser) {
                throw { name: "EmailAlreadyExists" };
            }
            const data = await User.create({
                email,
                username,
                password,
            });
            res.status(201).json({
                message: `${email} successfully registered`,
                email: email,

            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Register;
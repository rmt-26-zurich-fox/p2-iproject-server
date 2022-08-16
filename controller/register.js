const { User } = require("../models");

class Register {
    static async postRegister(req, res, next) {
        try {
            const { email, password } = req.body;
            const findUser = await User.findOne({ where: { email } });
            if (findUser) {
                throw { name: "EmailAlreadyExists" };
            }
            const data = await User.create({
                email,
                password,
            });
            res.status(201).json({
                message: `${email} successfully registered`,
                user: {
                    email: email,
                }
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Register;
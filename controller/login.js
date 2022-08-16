const { User } = require("../models");
const { OAuth2Client } = require('google-auth-library');
const { createToken } = require("../helper/jwt");
const { comparePassword } = require("../helper/bcrypt");
const makeRandomPassword = require("../helper/makeRandomPw");
require("dotenv").config();

class Login {
    static async postLogin(req, res, next) {
        try {
            const { email, password } = req.body;

            if (!email && !password) {
                throw { name: "EmailAndPasswordRequired" };
            }
            if (!email) {
                throw { name: "EmailRequired" };
            }
            if (!email.includes("@")) {
                throw { name: "invalidEmail" };
            }
            if (!password) {
                throw { name: "PasswordRequired" };
            }
            const findUser = await User.findOne({
                where: {
                    email
                }
            });
            if (!findUser) {
                throw { name: "InvalidEmailOrPassword" };
            }

            const passwordValidation = comparePassword(password, findUser.password);

            if (!passwordValidation) {
                throw { name: "InvalidEmailOrPassword" };
            }

            const payload = {
                id: findUser.id,
            };

            const accessToken = createToken(payload);

            res.status(200).json({
                access_token: accessToken,
                email: findUser.email,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Login;
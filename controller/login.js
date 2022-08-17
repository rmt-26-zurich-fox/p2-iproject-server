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
                id: findUser.id
            });
        } catch (error) {
            next(error);
        }
    }

    static async googleLogin(req, res, next) {
        try {
            const { token_google } = req.headers;
            const key = process.env.CLIENT_ID;
            const client = new OAuth2Client(key);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: key,
            });
            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    email: payload.email,
                    password: makeRandomPassword(5),
                },
                hooks: false,
                validate: false
            });
            const access_token = createToken({
                id: user.id
            });
            res.status(200).json({
                access_token,
                email: payload.email,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Login;
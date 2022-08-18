const {
    User
} = require("../models");
const {
    comparePassword
} = require("../helpers/bcryptjs");
const {
    createToken
} = require("../helpers/jwt");
const {
    OAuth2Client
} = require('google-auth-library');

class UserController {

    // Register Admin
    static async registerAdmin(req, res, next) {
        try {
            const {
                username,
                email,
                password
            } = req.body;
            const registerAdmin = await User.create({
                username,
                email,
                password,
                role: "Admin"
            });
            res.status(201).json({
                message: "Success create new Admin",
                id: registerAdmin.id,
                email: registerAdmin.email
            })
        } catch (error) {
            next(error);
        }
    }

    // Register Vistor
    static async registerVisitor(req, res, next) {
        try {
            const {
                username,
                email,
                password
            } = req.body;
            const registerVisitor = await User.create({
                username,
                email,
                password,
                role: "Visitor"
            });
            res.status(201).json({
                message: "Success create new Visitor",
                id: registerVisitor.id,
                email: registerVisitor.email
            })
        } catch (error) {
            next(error);
        }
    }

    // Login Users
    static async loginUsers(req, res, next) {
        try {
            const {
                email,
                password
            } = req.body;
            if (!email) throw {
                name: "false"
            };
            if (!password) throw {
                name: "false"
            };

            const findUser = await User.findOne({
                where: {
                    email
                }
            });
            if (!findUser) throw {
                name: "userNotFound"
            };
            const isPassValid = comparePassword(password, findUser.password);
            if (!isPassValid) throw {
                name: "userNotFound"
            };
            const payload = {
                id: findUser.id,
                username: findUser.username,
                role: findUser.role
            }
            const token = createToken(payload);
            res.status(200).json({
                access_token: token
            });
        } catch (error) {
            next(error);
        }
    }

    // Login Google User
    static async loginGoogleVisitor(req, res, next) {
        try {
            const {
                google_token
            } = req.headers;
            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: google_token,
                audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const num = Math.floor(Math.random() * 10000000000);
            const randomPhoneNumberStr = num.toString();
            const [user, created] = await User.findOrCreate({
                where: {
                    email: payload.email
                },
                defaults: {
                    username: payload.name,
                    email: payload.email,
                    password: "login_dari_google",
                    role: "Visitor",
                    phoneNumber: randomPhoneNumberStr,
                    address: "data_dari_google"
                },
                hooks: false
            });
            const access_token = createToken({
                id: user.id,
                role: user.role,
                username: user.username,
            });
            res.status(200).json({
                access_token: access_token
            })
        } catch (error) {
            next(error);
        }
    }

}

module.exports = UserController;
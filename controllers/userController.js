const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jsonwebtoken");
const { OAuth2Client } = require('google-auth-library');
const { User, Profile } = require("../models");

class UserController {
    // Endpoint register admin
    static async adminRegister(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const role = "Admin";

            const data = await User.create({
                email, password, role
            });

            await Profile.create({
                UserId: data.id
            });

            res.status(201).json({
                message: "Success Register Admin",
                data: { id: data.id, email: data.email, role: data.role }
            });
        } catch (error) {
            next(error);
        }
    }

    // Endpoint register customer
    static async customerRegister(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;
            const role = "Customer";

            const data = await User.create({
                email, password, role
            });

            await Profile.create({
                UserId: data.id
            });

            res.status(201).json({
                message: "Success Register Customer",
                data: { id: data.id, email: data.email, role: data.role }
            });
        } catch (error) {
            next(error);
        }
    }

    // Endpoint login
    static async login(req, res, next) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            const user = await User.findOne({
                include: Profile,
                where: {
                    email
                }
            });

            if (!user) throw { code: 401, error: "Invalid email / password" };

            const validatePass = comparePassword(password, user.password);

            if (!validatePass) throw { code: 401, error: "Invalid email / password" };

            const payload = {
                id: user.id
            };

            const access_token = createToken(payload);

            res.status(200).json({
                access_token,
                email: user.email,
                role: user.role,
                user_id: user.id,
                profile_id: user.Profile.id,
                profile_first_name: user.Profile.firstName
            });
        } catch (error) {
            next(error);
        }
    }

    // Endpoint Login Google
    static async loginGoogle(req, res, next) {
        try {
            const token_google = req.headers.token_google;

            const client = new OAuth2Client(process.env.SECRET_GOOGLE_CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: token_google,
                audience: process.env.SECRET_GOOGLE_CLIENT_ID,
            });
            const payload = ticket.getPayload();

            const [user, created] = await User.findOrCreate({
                where: { email: payload.email },
                defaults: {
                    email: payload.email,
                    password: "ini_password_google",
                    role: "Customer",
                },
                hooks: false
            });

            const [profile, createdProfile] = await Profile.findOrCreate({
                where: { UserId: user.id },
                defaults: {
                    firstName: payload.given_name ? payload.given_name : undefined,
                    lastName: payload.family_name ? payload.family_name : undefined,
                },
            });

            const access_token = createToken({
                id: user.id
            });

            res.status(200).json({
                access_token,
                email: user.email,
                role: user.role,
                user_id: user.id,
                profile_id: profile.id,
                profile_first_name: payload.given_name ? payload.given_name : "No Name"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = UserController;
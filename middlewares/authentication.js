const { verifyToken } = require("../helpers/jsonwebtoken.js");
const { User, Profile } = require("../models");

const isLoggedIn = async (req, res, next) => {
    try {
        let access_token = req.headers.access_token;
        if (!access_token) throw { code: 401, error: "Please login" };

        let payload = verifyToken(access_token);

        let user = await User.findByPk(payload.id, {
            include: Profile
        });
        if (!user) throw { name: "Unauthorized", error: "User not found" };

        req.user = {
            id: user.id,
            email: user.email,
            role: user.role,
            profile_id: user.Profile.id
        }

        next();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    isLoggedIn
};
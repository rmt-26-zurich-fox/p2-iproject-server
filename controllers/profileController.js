const { Profile } = require("../models");

class ProfileController {
    static async getProfile(req, res, next) {
        try {
            const data = await Profile.findOne({
                where: {
                    UserId: +req.user.id
                }
            })

            if (!data) throw { code: 404, error: "Profile not found!" };

            res.status(200).json({
                message: "Success get profile",
                data
            })
        } catch (error) {
            next(error);
        }
    }

    static async editProfile(req, res, next) {
        try {
            const findProfile = await Profile.findOne({
                where: {
                    UserId: +req.user.id
                }
            })

            if (!findProfile) throw { code: 404, error: "Profile not found!" };

            const newProfile = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                address: req.body.address,
                phoneNumber: req.body.phoneNumber,
                editStatus: "Yes",
                UserId: +findProfile.UserId,
            }

            await Profile.update(newProfile, {
                where: {
                    id: findProfile.id
                }
            });

            res.status(200).json({
                message: "Success edit profile"
            })
        } catch (error) {
            next(error);
        }
    }
}

module.exports = ProfileController;
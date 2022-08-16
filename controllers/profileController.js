const { Profile } = require("../models");

class ProfileController {
  static async createProfile(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        selfDescription,
        address,
        phoneNumber,
        profilePicture,
        birthdate,
      } = req.body;
      const { id } = req.user;
      const createdProfile = await Profile.create({
        firstName,
        lastName,
        selfDescription,
        address,
        phoneNumber,
        profilePicture,
        birthdate,
        UserId: id,
      });
      res.status(201).json({ message: `Profile with ID ${createdProfile.id}` });
    } catch (error) {
      next(error);
    }
  }

  static async editProfile(req, res, next) {
    try {
      const {
        firstName,
        lastName,
        selfDescription,
        address,
        phoneNumber,
        profilePicture,
        birthdate,
      } = req.body;
      const { profileId } = req.params;
      const updatedProfile = await Profile.update(
        {
          firstName,
          lastName,
          selfDescription,
          address,
          phoneNumber,
          profilePicture,
          birthdate,
        },
        { where: { id: profileId } }
      );
      res.status(200).json({ message: `Profile has been updated` });
    } catch (error) {
      next(error);
    }
  }

  static async findOneProfile(req, res, next) {
    try {
      const { profileId } = req.params;
      let targetProfile = await Profile.findByPk(profileId);
      delete targetProfile.dataValues.createdAt;
      delete targetProfile.dataValues.updatedAt;
      res.status(200).json(targetProfile);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;

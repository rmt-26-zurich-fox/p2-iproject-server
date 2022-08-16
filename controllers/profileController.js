const { Profile, ProfileLikeThread, ProfileTeam, Team } = require("../models");

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
      let targetProfile = await Profile.findOne({
        where: {
          id: profileId,
        },
        include: {
          model: ProfileLikeThread,
        },
      });
      delete targetProfile.dataValues.createdAt;
      delete targetProfile.dataValues.updatedAt;
      res.status(200).json(targetProfile);
    } catch (error) {
      next(error);
    }
  }

  static async likeAThread(req, res, next) {
    try {
      const { threadId } = req.params;
      const { profileId } = req.user;
      const [like, created] = await ProfileLikeThread.findOrCreate({
        where: {
          ThreadId: threadId,
          ProfileId: profileId,
        },
        defaults: {
          ThreadId: threadId,
          ProfileId: profileId,
        },
      });
      if (!created) {
        throw { name: "alreadyLikedTheThread" };
      }
      res.status(201).json({ message: `Liked a thread with ID ${threadId}` });
    } catch (error) {
      next(error);
    }
  }
  static async dislikeAThread(req, res, next) {
    try {
      const { threadId } = req.params;
      const { profileId } = req.user;
      const deletedLike = await ProfileLikeThread.destroy({
        where: {
          ThreadId: threadId,
          ProfileId: profileId,
        },
      });
      res.status(200).json({ message: `Disliked the thread` });
    } catch (error) {
      next(error);
    }
  }
  static async likeATeam(req, res, next) {
    try {
      const { teamId } = req.params;
      const { profileId } = req.user;
      const targetTeam = await Team.findByPk(teamId);
      if (!targetTeam) {
        throw { name: "teamNotFound" };
      }
      const likedATeam = await ProfileTeam.create({});
      res.status(200).json({ message: `Disliked the thread` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ProfileController;

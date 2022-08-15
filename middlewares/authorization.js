const { Profile } = require("../models");

async function authorization(err, req, res, next) {
  try {
    const { profileId } = req.params;
    const { id } = req.user;
    const targetProfile = await Profile.findByPk(profileId);
    if (!targetProfile) {
      throw { name: "profileNotFound" };
    }
    if (targetProfile.UserId !== id) {
      throw { name: "unauthorized" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;

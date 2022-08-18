const { Profile } = require("../models");

const authorizationUpdateProfile = async (req, res, next) => {
  try {
    const getProfile = await Profile.findOne({
      where: { userId: req.params.id },
    });
    console.log(getProfile.userId);
    if (getProfile.userId !== req.user.id) {
      throw { name: "Forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { authorizationUpdateProfile };

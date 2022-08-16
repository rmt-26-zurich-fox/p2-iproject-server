const getAge = require("../helpers/dateToAge");
const { verifyToken } = require("../helpers/jwt");
const { User, Profile } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    if (!access_token || access_token === "null") {
      throw { name: "notLoggedIn" };
    }
    let payload = verifyToken(access_token);
    const { id } = payload;
    const targetUser = await User.findByPk(id);

    if (!targetUser) {
      throw { name: "invalid_email/password" };
    }
    req.user = {
      id: +id,
      role: targetUser.role,
      name: targetUser.username,
    };
    next();
  } catch (error) {
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const { id } = req.user;
    const targetProfile = await Profile.findOne({
      where: {
        UserId: id,
      },
    });
    if (!targetProfile) {
      throw { name: "profileNotFound" };
    }
    req.user.profileId = targetProfile.id;
    req.user.birthDate = targetProfile.birthdate;
    next();
  } catch (error) {
    next(error);
  }
};

const underAgeVerification = async (req, res, next) => {
  try {
    const { birthDate } = req.user;
    const age = getAge(birthDate);
    if (age > 17) {
      req.user.underAge = false;
    } else {
      req.user.underAge = true;
    }
    next();
  } catch (error) {
    next(error);
  }
};
module.exports = { authentication, getProfile, underAgeVerification };

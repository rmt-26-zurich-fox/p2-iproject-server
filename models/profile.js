"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "First name cannot be null",
          },
          notEmpty: {
            msg: "First name is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Last name cannot be null",
          },
          notEmpty: {
            msg: "Last name is required",
          },
        },
      },
      profilePicture: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING,
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User cannot be null",
          },
          notEmpty: {
            msg: "User is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  Profile.beforeCreate((profile, options) => {
    profile.profilePicture = "https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png" 
  })
  return Profile;
};

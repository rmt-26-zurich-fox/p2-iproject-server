"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, { foreignKey: "UserId" });
      Profile.belongsToMany(models.Team, {
        through: models.ProfileTeam,
        foreignKey: "ProfileId",
      });
      Profile.belongsToMany(models.Comment, {
        through: models.ProfileComment,
        foreignKey: "ProfileId",
      });
      Profile.belongsToMany(models.Thread, {
        through: models.ProfileLikeThread,
        foreignKey: "ProfileId",
      });
      Profile.belongsToMany(models.Comment, {
        through: models.ProfileLikeComment,
        foreignKey: "ProfileId",
      });
      Profile.hasMany(models.Thread, { foreignKey: "ProfileId" });
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `First name cannot be empty`,
          },
          notNull: {
            msg: `First name cannot be empty`,
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Last name cannot be empty`,
          },
          notNull: {
            msg: `Last name cannot be empty`,
          },
        },
      },
      selfDescription: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Self description cannot be empty`,
          },
          notNull: {
            msg: `Self description cannot be empty`,
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Address cannot be empty`,
          },
          notNull: {
            msg: `Address cannot be empty`,
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Phone Number is required`,
          },
          notNull: {
            msg: `Phone Number is required`,
          },
        },
      },
      profilePicture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Profile picture is required`,
          },
          notNull: {
            msg: `Profile picture is required`,
          },
        },
      },
      birthdate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Birthdate is required`,
          },
          notNull: {
            msg: `Birthdate is required`,
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `User ID is required`,
          },
          notNull: {
            msg: `User ID is required`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};

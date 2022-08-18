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
      Profile.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  Profile.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Firstname is required",
          },
          notNull: {
            msg: "Firstname is required",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Lastname is required",
          },
          notNull: {
            msg: "Lastname is required",
          },
        },
      },
      dateOfBirth: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Date of Birth is required",
          },
          notNull: {
            msg: "Date of Birth is required",
          },
        },
      },
      gender: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Gender is required",
          },
          notNull: {
            msg: "Gender is required",
          },
        },
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Height is required",
          },
          notNull: {
            msg: "Height is required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Image Url is required",
          },
          notNull: {
            msg: "Image Url is required",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Phone Number is required",
          },
          notNull: {
            msg: "Phone Number is required",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "location is required",
          },
          notNull: {
            msg: "location is required",
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Profile",
    }
  );
  return Profile;
};

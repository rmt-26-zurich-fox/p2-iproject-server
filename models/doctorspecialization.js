"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DoctorSpecialization extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DoctorSpecialization.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  DoctorSpecialization.init(
    {
      userId: {
        type: DataTypes.Integer,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User Id is required",
          },
          notNull: {
            msg: "User Id is required",
          },
        },
      },
      specialization_one: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Specialization is required",
          },
          notNull: {
            msg: "Specialization is required",
          },
        },
      },
      specialization_two: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Specialization is required",
          },
          notNull: {
            msg: "Specialization is required",
          },
        },
      },
      specialization_three: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Specialization is required",
          },
          notNull: {
            msg: "Specialization is required",
          },
        },
      },
      specialization_four: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Specialization is required",
          },
          notNull: {
            msg: "Specialization is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "DoctorSpecialization",
    }
  );
  return DoctorSpecialization;
};

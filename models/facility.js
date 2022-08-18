"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Facility extends Model {
    static associate(models) {
      Facility.hasMany(models.HouseFacility, { foreignKey: "FacilityId" });
    }
  }
  Facility.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Facility name cannot be null",
          },
          notEmpty: {
            msg: "Facility name is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Facility",
    }
  );
  return Facility;
};

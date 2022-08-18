"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class HouseFacility extends Model {
    static associate(models) {
      HouseFacility.belongsTo(models.House, { foreignKey: "HouseId" });
      HouseFacility.belongsTo(models.Facility, { foreignKey: "FacilityId" });
    }
  }
  HouseFacility.init(
    {
      HouseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "House cannot be null",
          },
          notEmpty: {
            msg: "House is required",
          },
        },
      },
      FacilityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Facility cannot be null",
          },
          notEmpty: {
            msg: "Facility is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "HouseFacility",
    }
  );
  return HouseFacility;
};

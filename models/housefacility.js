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
      HouseId: DataTypes.INTEGER,
      FacilityId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "HouseFacility",
    }
  );
  return HouseFacility;
};

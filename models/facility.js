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
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Facility",
    }
  );
  return Facility;
};

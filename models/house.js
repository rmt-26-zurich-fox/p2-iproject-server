"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    static associate(models) {
      House.belongsTo(models.User, { foreignKey: "UserId" });
      House.belongsTo(models.Category, { foreignKey: "CategoryId" });
      House.hasMany(models.Image, { foreignKey: "HouseId" });
      House.hasMany(models.HouseFacility, {foreignKey: "HouseId"})
    }
  }
  House.init(
    {
      name: DataTypes.STRING,
      location: DataTypes.STRING,
      price: DataTypes.INTEGER,
      review: DataTypes.STRING,
      CategoryId: DataTypes.INTEGER,
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "House",
    }
  );
  return House;
};

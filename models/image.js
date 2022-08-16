"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsTo(models.House, { foreignKey: "HouseId" });
    }
  }
  Image.init(
    {
      imageUrl: DataTypes.STRING,
      HouseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};

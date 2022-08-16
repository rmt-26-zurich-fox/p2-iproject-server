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
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image Url cannot be null",
          },
          notEmpty: {
            msg: "Image Url is required",
          },
        },
      },
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
    },
    {
      sequelize,
      modelName: "Image",
    }
  );
  return Image;
};

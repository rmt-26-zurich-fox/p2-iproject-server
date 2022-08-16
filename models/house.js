"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class House extends Model {
    static associate(models) {
      House.belongsTo(models.User, { foreignKey: "UserId" });
      House.belongsTo(models.Category, { foreignKey: "CategoryId" });
      House.hasMany(models.Image, { foreignKey: "HouseId" });
      House.hasMany(models.HouseFacility, { foreignKey: "HouseId" });
    }
  }
  House.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "House name cannot be null",
          },
          notEmpty: {
            msg: "House name is required",
          },
        },
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Location cannot be null",
          },
          notEmpty: {
            msg: "Location is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price cannot be null",
          },
          notEmpty: {
            msg: "Price is required",
          },
          min: {
            args: 100000,
            msg: "price cant be lower than Rp.100.000",
          },
        },
      },
      review: DataTypes.STRING,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Category cannot be null",
          },
          notEmpty: {
            msg: "Category is required",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User cannot be null",
          },
          notEmpty: {
            msg: "User is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "House",
    }
  );
  return House;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Package extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Package.hasMany(models.Cloth);
    }
  }
  Package.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `name is required` },
          notNull: { msg: `name is required` },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `price is required` },
          notNull: { msg: `price is required` },
        },
      },
      deadlineDay: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `deadline day is required` },
          notNull: { msg: `deadline day is required` },
        },
      },
    },
    {
      sequelize,
      modelName: "Package",
    }
  );
  return Package;
};

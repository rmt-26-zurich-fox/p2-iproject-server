"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: ` product name can't be empty` },
          notEmpty: { msg: `product name can't be empty` },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: `Price can't be empty` },
          notEmpty: { msg: `Price can't be empty` },
        },
      },
      detail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Detail can't be empty` },
          notEmpty: { msg: `Detail can't be empty` },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: `Image url can't be empty` },
          notEmpty: { msg: `Image url can't be empty` },
        },
      },
      UserId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

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
      // define association here
      Product.hasMany(models.Cart, { foreignKey: "ProductId" });
    }
  }
  Product.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name of product cannot be null",
          },
          notEmpty: {
            msg: "Name of product is required",
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Description of product cannot be null",
          },
          notEmpty: {
            msg: "Description of product is required",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 5000,
        validate: {
          notNull: {
            msg: "Price of product cannot be null",
          },
          notEmpty: {
            msg: "Price of product is required",
          },
        },
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: [0],
          notNull: {
            msg: "Stock of product cannot be null",
          },
          notEmpty: {
            msg: "Stock of product is required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Image url of product cannot be null",
          },
          notEmpty: {
            msg: "Image url of product is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};

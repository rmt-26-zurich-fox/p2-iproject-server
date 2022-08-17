"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(models.User, { foreignKey: "UserId" });
      Cart.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  Cart.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "User id cannot be null",
          },
          notEmpty: {
            msg: "User id is required",
          },
        },
      },
      ProductId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Product Id of product cannot be null",
          },
          notEmpty: {
            msg: "Product Id of product is required",
          },
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 1,
        validate: {
          notNull: {
            msg: "Quantity of product cannot be null",
          },
          notEmpty: {
            msg: "Quantity of product is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};

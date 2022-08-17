"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Transaction.init(
    {
      products: DataTypes.ARRAY(DataTypes.TEXT),
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,

        validate: {
          notNull: {
            msg: "User Id of product cannot be null",
          },
          notEmpty: {
            msg: "User Id of product is required",
          },
        },
      },
      paymentStatus: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        validate: {
          notNull: {
            msg: "Payment Status of product cannot be null",
          },
          notEmpty: {
            msg: "Payment Status of product is required",
          },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        min: 0,
        validate: {
          notNull: {
            msg: "Total Price of product cannot be null",
          },
          notEmpty: {
            msg: "Total Price of product is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Cloth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cloth.belongsTo(models.User);
      Cloth.belongsTo(models.Package);
    }
  }
  Cloth.init(
    {
      UserId: {
        type: DataTypes.INTEGER,
      },
      PackageId: {
        type: DataTypes.INTEGER,
      },
      deadlineDate: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Deadline is required` },
          notNull: { msg: `Deadline is required` },
        },
      },
      weight: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `weight is required` },
          notNull: { msg: `weight is required` },
        },
      },
      totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Total price is required` },
          notNull: { msg: `Total price is required` },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `status is required` },
          notNull: { msg: `status is required` },
        },
      },
      payment: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `payment is required` },
          notNull: { msg: `payment is required` },
        },
      },
    },
    {
      sequelize,
      modelName: "Cloth",
    }
  );
  return Cloth;
};

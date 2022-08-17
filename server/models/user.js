"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: "UserId" });
      User.hasMany(models.Service, { foreignKey: "UserId" });
      User.hasMany(models.ProductRequest, { foreignKey: "UserId" });
      User.hasMany(models.ServiceRequest, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      // name: { type: DataTypes.STRING },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Email can't be empty` },
          notNull: { msg: `Email can't be empty` },
          isEmail: { msg: `Please insert your email` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Password can't be empty` },
          notNull: { msg: `Password can't be empty` },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Phone number can't be empty` },
          notNull: { msg: `Phone number can't be empty` },
        },
      },
      address: { type: DataTypes.STRING },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: (instance, options) => {
          instance.password = hashPassword(instance.password);
        },
      },
    }
  );
  return User;
};

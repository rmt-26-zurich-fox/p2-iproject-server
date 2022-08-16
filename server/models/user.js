"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/helpers");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cloth);
    }
  }
  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `name is required` },
          notNull: { msg: `name is required` },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: { msg: `email must be unique` },
        allowNull: false,
        validate: {
          notEmpty: { msg: `email is required` },
          notNull: { msg: `email is required` },
          isEmail: { msg: `must be valid email format` },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `password is required` },
          notNull: { msg: `password is required` },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `role is required` },
          notNull: { msg: `role is required` },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Phone Number is required` },
          notNull: { msg: `Phone Number is required` },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate(async (user, options) => {
    const hashedPassword = hashPassword(user.password);
    user.password = hashedPassword;
  });
  return User;
};

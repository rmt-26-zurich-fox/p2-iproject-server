"use strict";
const { hash } = require("../helper/bcrypt");

const { Model } = require("sequelize");
const threadtitle = require("./threadtitle");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Cart);
      User.hasMany(models.ThreadTitle);
      User.hasMany(models.ThreadReply);
    }
  }
  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "Username already registered" },
        validate: {
          notEmpty: { msg: "Username required" },
          notNull: { msg: "Username required" },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: { msg: "E-mail already registered" },
        validate: {
          notEmpty: { msg: "E-mail required" },
          notNull: { msg: "E-mail required" },
          isEmail: { msg: "Please input valid e-mail" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password required" },
          notNull: { msg: "Password required" },
          len: {
            args: [5],
            msg: "Password must contain at least 5 characters",
          },
        },
      },
      imageUrl: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );

  User.beforeCreate((instance) => {
    instance.password = hash(instance.password);
  });
  return User;
};

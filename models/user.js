'use strict';
const {
  Model
} = require('sequelize');
const { hash } = require('../helper/helper');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Username required" },
        notNull: { msg: "Username required" }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { msg: "Email already exist" },
      validate: {
        notEmpty: { msg: "Email required" },
        notNull: { msg: "Email required" },
        isEmail: { msg: "Must be example@mail.com" }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: "Password required" },
        notNull: { msg: "Password required" }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hash(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
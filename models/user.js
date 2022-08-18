"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bycript");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.News, { foreignKey: "authorId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "email already registered",
        },
        validate: {
          notNull: {
            msg: "email required",
          },
          notEmpty: {
            msg: "email required",
          },
          isEmail: {
            msg: "value must email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "password required",
          },
          notEmpty: {
            msg: "password required",
          },
          min: {
            args: 5,
            msg: "password minimum 5 letter/number",
          },
        },
      },
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((user, options) => {
    user.password = hashPassword(user.password);
  });
  return User;
};

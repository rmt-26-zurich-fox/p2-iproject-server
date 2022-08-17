"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/helper");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Cart, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "email is taken",
        },
        validate: {
          notEmpty: {
            msg: `email cannot be empty`,
          },
          notNull: {
            msg: `email cannot be empty`,
          },
          isEmail: {
            msg: `email is invalid`,
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `password cannot be empty`,
          },
          notNull: {
            msg: `password cannot be empty`,
          },
          len: {
            args: [8],
            msg: "minimum password characters is 8",
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

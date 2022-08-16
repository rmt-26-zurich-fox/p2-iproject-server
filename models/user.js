'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Post, { foreignKey: "UserId" });
      User.hasMany(models.Like, { foreignKey: "UserId" });
      User.hasMany(models.Comment, { foreignKey: "UserId" });
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },
      validate: {
        isEmail: {
          msg: "Invalid email input"
        },
        notEmpty: {
          msg: "Email required"
        },
        notNull: {
          msg: "Email required"
        },
      },
      unique: {
        args: true,
        msg: 'Email address already in use!'
      },

    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password required",
        },
        notNull: {
          msg: "Password required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
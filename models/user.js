'use strict';
const { hashPassword } = require('../helper/bcrypt');
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
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "username required",
        },
        notNull: {
          msg: "username required"
        }
      }
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
    hooks: {
      beforeCreate(user, options) {
        user.password = hashPassword(user.password);
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};
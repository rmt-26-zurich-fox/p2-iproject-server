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
      User.hasMany(models.SavedLocation)
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Email cant be empty"
        },
        notEmpty: {
          msg: "Email cant be empty"
        },
        isEmail: {
          msg: "Email must match the format"
        },
      },
      unique: {
        msg: "Email already registered"
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cant be empty"
        },
        notEmpty: {
          msg: "Password cant be empty"
        },
        len: {
          args: 5,
          msg: "Password minimal 5 character"
        }
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Phone number cant be null"
        },
        notEmpty: {
          msg: "Phone number cant be empty"
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Location cant be null"
        },
        notEmpty: {
          msg: "Location cant be empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
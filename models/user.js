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
      User.hasMany(models.ShoppingCart)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Username is required`
        },
        notEmpty:{
          msg: `Username is required`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Email is required`
        },
        isEmail: {
          msg: `Invalid email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Password is required`
        },
        len: [5, 20]
      }
    },
    phoneNumber:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: `Phone Number is required`
      },
      notEmpty:{
        msg: `Phone Number is required`
      }
    }
  },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: `Address is required`
        },
        notEmpty:{
          msg: `Address is required`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
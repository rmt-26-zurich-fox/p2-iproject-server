'use strict';
const { hashPassword} = require('../helpers/bcrypt')
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
    }
  }
  User.init({
    email: { 
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "email has already been used"
      },
      validate : {
        notNull : {
          msg: "email cannot be null"
        },
        notEmpty : {
          msg : "email cannot be empty"
        },
      }  
    },
    password: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate : {
        notNull : {
          msg: "password cannot be null"
        },
        notEmpty : {
          msg : "password cannot be empty"
        },
      }  
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
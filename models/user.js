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
      this.hasMany(models.Report)
    }
  }
  User.init({
    username: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notEmpty:{msg: 'Username is required'},
    notNull:{msg: 'Username is required'}
  }},
    email: {type: DataTypes.STRING,
    allowNull:false,
    unique:{msg: 'Email is already used'},
  validate:{
    notEmpty:{msg: 'Email is required'},
    notNull:{msg: 'Email is required'}
  }},
    password: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notEmpty:{msg: 'Password is required'},
    notNull:{msg: 'Password is required'}
  }},
    phoneNumber: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notEmpty:{msg: 'PhoneNumber is required'},
    notNull:{msg: 'PhoneNumber is required'}
  }}
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
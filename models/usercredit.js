'use strict';

const { hashPassword } = require('../helpers/bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserCredit extends Model {
    static associate(models) {
      UserCredit.belongsTo(models.User, { foreignKey: 'id' });
    }
  }
  UserCredit.init({
    creditNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Credit number must be unique'
      },
      validate: {
        notNull: { msg: 'Credit number is required' },
        notEmpty: { msg: 'Credit number is required' },
      }
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Expiry date is required' },
        notEmpty: { msg: 'Expiry date is required' },
      }
    },
    cvv: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Security code is required' },
        notEmpty: { msg: 'Security code is required' },
      }
    },
  }, {
    sequelize,
    modelName: 'UserCredit',
    hooks: {
      beforeCreate: (instance, options) => {

        instance.cvv = hashPassword(instance.cvv);

      },
      beforeUpdate: (instance, options) => {

        instance.cvv = hashPassword(instance.cvv);

      },
    }
  });
  return UserCredit;
};
'use strict';
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
        notNull: { msg: 'Number is required' },
        notEmpty: { msg: 'Number is required' },
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
        const bcryptjs = require('bcryptjs');
        instance.cvv = bcryptjs.hashSync(instance.cvv, 10);
      }
    }
  });
  return UserCredit;
};
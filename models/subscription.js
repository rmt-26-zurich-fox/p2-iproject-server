'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    static associate(models) {
      Subscription.belongsTo(models.User, { foreignKey: "UserId" });
    }
  }
  Subscription.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User Id is required' },
        notEmpty: { msg: 'User Id is required' },
      }
    },
    expiryDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: { msg: 'Expiry date is required' },
        notEmpty: { msg: 'Expiry date is required' },
      }
    }
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};
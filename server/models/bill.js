'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bill extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bill.init({
    RequestProductId: DataTypes.INTEGER,
    RequestServiceId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    totalAmount: DataTypes.INTEGER,
    status: DataTypes.STRING,
    accountNumber: DataTypes.INTEGER,
    AccountId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bill',
  });
  return Bill;
};
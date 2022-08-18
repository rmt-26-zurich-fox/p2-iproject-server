'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class TransactionDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  TransactionDetail.init({
    quantity: DataTypes.INTEGER,
    subTotal: DataTypes.INTEGER,
    TransactionId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TransactionDetail',
  });
  return TransactionDetail;
};
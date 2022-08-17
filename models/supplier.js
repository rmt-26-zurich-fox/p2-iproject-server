'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Supplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Supplier.hasMany(models.Item, {
        foreignKey: "SupplierId"
      })
    }
  }
  Supplier.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Supplier name is required"
        },
        notEmpty: {
          msg: "Supplier name cannot empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Supplier',
  });
  return Supplier;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
      this.belongsTo(models.Category)
    }
  }
  Report.init({
    imageUrl: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notEmpty:{msg: 'ImageUrl is required'},
    notNull:{msg: 'ImageUrl is required'}
  }},
    name: {type: DataTypes.STRING,
    allowNull:false,
  validate:{
    notEmpty:{msg: 'Name is required'},
    notNull:{msg: 'Name is required'}
  }},
    CategoryId: {type: DataTypes.INTEGER,
    allowNull:false,
  validate:{
    notEmpty:{msg: 'CategoryId is required'},
    notNull:{msg: 'CategoryId is required'}
  }},
    UserId: {type: DataTypes.INTEGER,
    allowNull:false,
  validate:{
    notEmpty:{msg: 'UserId is required'},
    notNull:{msg: 'UserId is required'}
  }}
  }, {
    sequelize,
    modelName: 'Report',
  });
  return Report;
};
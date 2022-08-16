'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SavedLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SavedLocation.belongsTo(models.User)
    }
  }
  SavedLocation.init({
    name: DataTypes.STRING,
    country: DataTypes.STRING,
    latitude: DataTypes.INTEGER,
    longtitude: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SavedLocation',
  });
  return SavedLocation;
};
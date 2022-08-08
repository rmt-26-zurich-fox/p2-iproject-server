'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patchnote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Patchnote.init({
    name: DataTypes.STRING,
    url: DataTypes.STRING,
    date: DataTypes.DATE,
    additions: DataTypes.TEXT,
    changes: DataTypes.TEXT,
    fixes: DataTypes.TEXT,
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Patchnote',
  });
  return Patchnote;
};
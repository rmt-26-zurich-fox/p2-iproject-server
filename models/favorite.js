'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Favorite.belongsTo(models.User, {foreignKey: 'UserId'})
      Favorite.belongsTo(models.Post, {foreignKey: 'PostId'})
    }
  }
  Favorite.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'UserId is require'},
        notEmpty: {msg: 'UserId is require'}
      }
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: 'PostId is require'},
        notEmpty: {msg: 'PostId is require'}
      }
    }
  }, {
    sequelize,
    modelName: 'Favorite',
  });
  return Favorite;
};
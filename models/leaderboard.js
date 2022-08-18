'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Leaderboard extends Model {
    static associate(models) {
      // Leaderboard.hasMany(models.User, { foreignKey: "UserId" });
    }
  }
  Leaderboard.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'User Id is required' },
        notEmpty: { msg: 'User Id is required' },
      }
    },
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    modelName: 'Leaderboard',
  });
  return Leaderboard;
};
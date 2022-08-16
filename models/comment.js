'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, {foreignKey: "UserId"})
      Comment.belongsTo(models.Anime, {foreignKey: "AnimeId"})
    }
  }
  Comment.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        notNull: {
          msg: `UserId is required`
        },
        notEmpty: {
          msg: `UserId is required`
        }
      }
    },
    AnimeId: {
      type: DataTypes.INTEGER,
      allowNull: false, 
      validate: {
        notNull: {
          msg: `AnimeId is required`
        },
        notEmpty: {
          msg: `AnimeId is required`
        }
      }
    },
    comment: DataTypes.STRING,
    gif: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
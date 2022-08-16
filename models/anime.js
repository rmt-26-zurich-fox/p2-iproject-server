'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Anime extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Anime.hasMany(models.Anime)
      Anime.hasMany(models.Planning)
    }
  }
  Anime.init({
    title: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    synopsis: DataTypes.STRING,
    airingStart: DataTypes.DATE,
    episodes: DataTypes.INTEGER,
    genre: DataTypes.STRING,
    score: DataTypes.INTEGER,
    season: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Anime',
  });
  return Anime;
};
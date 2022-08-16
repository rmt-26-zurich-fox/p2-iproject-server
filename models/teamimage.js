"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TeamImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TeamImage.belongsTo(models.Team, { foreignKey: "TeamId" });
    }
  }
  TeamImage.init(
    {
      TeamId: DataTypes.INTEGER,
      imageUrl: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "TeamImage",
    }
  );
  return TeamImage;
};

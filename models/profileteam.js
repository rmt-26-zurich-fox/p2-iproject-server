"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileTeam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileTeam.belongsTo(models.Profile, { foreignKey: "ProfileId" });
      ProfileTeam.belongsTo(models.Team, { foreignKey: "TeamId" });
    }
  }
  ProfileTeam.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      ProfileId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Profile Who likes the team cannot be empty` },
          notNull: { msg: `Profile Who likes the team cannot be empty` },
        },
      },
      TeamId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Team which favorited cannot be empty` },
          notNull: { msg: `Team which favorited cannot be empty` },
        },
      },
    },
    {
      sequelize,
      modelName: "ProfileTeam",
    }
  );
  return ProfileTeam;
};

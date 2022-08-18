"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Team.hasMany(models.Player, { foreignKey: "TeamId" });
      Team.belongsToMany(models.Profile, {
        through: models.ProfileTeam,
        foreignKey: "TeamId",
      });
      Team.hasOne(models.TeamImage, { foreignKey: "TeamId" });
    }
  }
  Team.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's name cannot be empty`,
          },
          notNull: {
            msg: `Team's name cannot be empty`,
          },
        },
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's full name cannot be empty`,
          },
          notNull: {
            msg: `Team's full name cannot be empty`,
          },
        },
      },
      abbreviation: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's abbreviation cannot be empty`,
          },
          notNull: {
            msg: `Team's abbreviation cannot be empty`,
          },
        },
      },
      conference: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Conference where the team plays cannot be empty`,
          },
          notNull: {
            msg: `Conference where the team plays cannot be empty`,
          },
        },
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `City where the team plays cannot be empty`,
          },
          notNull: {
            msg: `City where the team plays cannot be empty`,
          },
        },
      },
      division: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Division where the team plays cannot be empty`,
          },
          notNull: {
            msg: `Division where the team plays cannot be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Team",
    }
  );
  return Team;
};

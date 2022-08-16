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
      location: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's location cannot be empty`,
          },
          notNull: {
            msg: `Team's location cannot be empty`,
          },
        },
      },
      arena: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's home arena cannot be empty`,
          },
          notNull: {
            msg: `Team's home arena cannot be empty`,
          },
        },
      },
      team_colors: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's colors cannot be empty`,
          },
          notNull: {
            msg: `Team's colors cannot be empty`,
          },
        },
      },
      main_sponsor: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's main sponsor cannot be empty`,
          },
          notNull: {
            msg: `Team's main sponsor cannot be empty`,
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
      head_coach: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's head coach cannot be empty`,
          },
          notNull: {
            msg: `Team's head coach cannot be empty`,
          },
        },
      },
      president: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's president cannot be empty`,
          },
          notNull: {
            msg: `Team's president cannot be empty`,
          },
        },
      },
      general_manager: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's GM cannot be empty`,
          },
          notNull: {
            msg: `Team's GM cannot be empty`,
          },
        },
      },
      ownership: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `The ownership data of the team cannot be empty`,
          },
          notNull: {
            msg: `The ownership data of the team cannot be empty`,
          },
        },
      },
      championships: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Championship number cannot be empty`,
          },
          notNull: {
            msg: `Championship number cannot be empty`,
          },
        },
      },
      conference_titles: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Conference title number cannot be empty`,
          },
          notNull: {
            msg: `Conference title number cannot be empty`,
          },
        },
      },
      division_titles: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Division title number cannot be empty`,
          },
          notNull: {
            msg: `Division title number cannot be empty`,
          },
        },
      },
      retired_numbers: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's retired numbers cannot be empty`,
          },
          notNull: {
            msg: `Team's retired numbers cannot be empty`,
          },
        },
      },
      website: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's website cannot be empty`,
          },
          notNull: {
            msg: `Team's website cannot be empty`,
          },
        },
      },
      img_url: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Team's logo cannot be empty`,
          },
          notNull: {
            msg: `Team's logo cannot be empty`,
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

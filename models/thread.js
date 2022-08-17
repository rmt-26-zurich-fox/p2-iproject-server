"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Thread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Thread.belongsTo(models.Profile, { foreignKey: "ProfileId" });
      Thread.belongsTo(models.Category, { foreignKey: "CategoryId" });
      Thread.belongsToMany(models.Profile, {
        through: models.ProfileLikeThread,
        foreignKey: "ThreadId",
      });
      Thread.hasMany(models.Comment, { foreignKey: "ThreadId" });
    }
  }
  Thread.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Thread's title cannot be empty`,
          },
          notNull: {
            msg: `Thread's title cannot be empty`,
          },
        },
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Thread's description cannot be empty`,
          },
          notNull: {
            msg: `Thread's description cannot be empty`,
          },
        },
      },
      explicit: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Thread's explicit information cannot be empty`,
          },
          notNull: {
            msg: `Thread's explicit information cannot be empty`,
          },
        },
      },
      ProfileId: DataTypes.INTEGER,
      closed: DataTypes.BOOLEAN,
      CategoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: `Thread's category cannot be empty`,
          },
          notNull: {
            msg: `Thread's category cannot be empty`,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Thread",
    }
  );
  return Thread;
};

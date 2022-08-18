"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      News.belongsTo(models.Category, { foreignKey: "categoryId" });
      News.belongsTo(models.User, { foreignKey: "authorId" });
      News.hasMany(models.history, { foreignKey: "entityId" });
    }
  }
  News.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "title required",
          },
          notEmpty: {
            msg: "title required",
          },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "content required",
          },
          notEmpty: {
            msg: "content required",
          },
        },
      },
      imageUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notNull: {
            msg: "imageUrl required",
          },
          notEmpty: {
            msg: "imageUrl required",
          },
          isUrl: {
            msg: "imageUrl must URL format",
          },
        },
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "authorId required",
          },
          notEmpty: {
            msg: "authorId required",
          },
        },
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "category required",
          },
          notEmpty: {
            msg: "category required",
          },
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "status required",
          },
          notEmpty: {
            msg: "status required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};

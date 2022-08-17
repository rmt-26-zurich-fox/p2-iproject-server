"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ThreadTitle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ThreadTitle.belongsTo(models.User);
      ThreadTitle.hasMany(models.ThreadReply);
    }
  }
  ThreadTitle.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Title required" },
          notNull: { msg: "Title required" },
        },
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Content required" },
          notNull: { msg: "Content required" },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ThreadTitle",
    }
  );
  return ThreadTitle;
};

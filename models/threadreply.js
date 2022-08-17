"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ThreadReply extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ThreadReply.belongsTo(models.User);
      ThreadReply.belongsTo(models.ThreadTitle);
    }
  }
  ThreadReply.init(
    {
      content: DataTypes.TEXT,
      UserId: DataTypes.INTEGER,
      ThreadTitleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ThreadReply",
    }
  );
  return ThreadReply;
};

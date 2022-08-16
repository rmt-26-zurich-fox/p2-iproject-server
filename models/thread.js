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
      title: DataTypes.STRING,
      description: DataTypes.TEXT,
      explicit: DataTypes.BOOLEAN,
      ProfileId: DataTypes.INTEGER,
      closed: DataTypes.BOOLEAN,
      CategoryId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Thread",
    }
  );
  return Thread;
};

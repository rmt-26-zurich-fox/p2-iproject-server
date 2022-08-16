"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileLikeThread extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileLikeThread.belongsTo(models.Profile, { foreignKey: "ProfileId" });
      ProfileLikeThread.belongsTo(models.Thread, { foreignKey: "ThreadId" });
    }
  }
  ProfileLikeThread.init(
    {
      ProfileId: DataTypes.INTEGER,
      ThreadId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProfileLikeThread",
    }
  );
  return ProfileLikeThread;
};

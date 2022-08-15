"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileComment.belongsTo(models.Profile, { foreignKey: "ProfileId" });
      ProfileComment.belongsTo(models.Comment, { foreignKey: "CommentId" });
    }
  }
  ProfileComment.init(
    {
      ProfileId: DataTypes.INTEGER,
      CommentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProfileComment",
    }
  );
  return ProfileComment;
};

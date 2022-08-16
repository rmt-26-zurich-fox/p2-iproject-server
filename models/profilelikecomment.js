"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProfileLikeComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ProfileLikeComment.belongsTo(models.Profile, { foreignKey: "ProfileId" });
      ProfileLikeComment.belongsTo(models.Comment, { foreignKey: "CommentId" });
    }
  }
  ProfileLikeComment.init(
    {
      ProfileId: DataTypes.INTEGER,
      CommentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProfileLikeComment",
    }
  );
  return ProfileLikeComment;
};

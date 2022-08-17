"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Comment.belongsToMany(models.Profile, {
      //   through: models.ProfileComment,
      //   foreignKey: "CommentId",
      // });
      // Comment.belongsToMany(models.Profile, {
      //   through: models.ProfileLikeComment,
      //   foreignKey: "CommentId",
      // });
      Comment.belongsTo(models.Thread, { foreignKey: "ThreadId" });
      Comment.belongsTo(models.Profile, { foreignKey: "ProfileId" });
    }
  }
  Comment.init(
    {
      comment: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: `Comment cannot be empty` },
          notNull: { msg: `Comment cannot be empty` },
        },
      },
      explicit: DataTypes.BOOLEAN,
      ProfileId: DataTypes.INTEGER,
      ThreadId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};

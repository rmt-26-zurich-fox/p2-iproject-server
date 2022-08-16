'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comment.belongsTo(models.User, { targetKey: "id", foreignKey: "UserId" });
      Comment.belongsTo(models.Post, { targetKey: "id", foreignKey: "PostId" });
    }
  }
  Comment.init({
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "comment required"
        },
        notNull: {
          msg: "comment required"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    PostId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};
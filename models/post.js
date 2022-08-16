'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Post.belongsTo(models.User, { targetKey: "id", foreignKey: "UserId" });
      Post.hasMany(models.Comment, { foreignKey: "PostId" });
      Post.hasMany(models.Like, { foreignKey: "PostId" });
    }
  }
  Post.init({
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "content required"
        },
        notNull: {
          msg: "content required"
        }
      }
    },
    UserId: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
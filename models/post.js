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
      Post.belongsTo(models.User);
      Post.belongsTo(models.Category);
    }
  }
  Post.init({
    UserId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "UserId is required"
        },
        notEmpty: {
          msg: "UserId is required"
        }
      }
    },
    CategoryId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        notNull: {
          msg: "CategoryId is required"
        },
        notEmpty: {
          msg: "CategoryId is required"
        }
      }
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Post name is required"
        },
        notEmpty: {
          msg: "Post name is required"
        }
      }
    },
    imageUrl: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          msg: "ImageURL is required"
        },
        notEmpty: {
          msg: "ImageURL is required"
        }
      }
    },
    article: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: {
          msg: "Article is required"
        },
        notEmpty: {
          msg: "Article is required"
        }
      }
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Status is required"
        },
        notEmpty: {
          msg: "Status is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
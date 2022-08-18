'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookmark extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User)
    }
  }
  Bookmark.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "User is required"
        },
        notNull: {
          msg: "User is required"
        }
      }
    },
    CityName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "City name is required"
        },
        notNull: {
          msg: "City name is required"
        }
      }
    },
    StateName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "State name is required"
        },
        notNull: {
          msg: "State name is required"
        }
      }
    },
    CountryName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Country name is required"
        },
        notNull: {
          msg: "Country name is required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Bookmark',
  });
  return Bookmark;
};
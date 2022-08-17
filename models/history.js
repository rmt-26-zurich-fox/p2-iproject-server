'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  History.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Title cannot be empty',
          },
          notEmpty: {
            msg: 'Title cannot be empty',
          },
        },
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Description cannot be empty',
          },
          notEmpty: {
            msg: 'Description cannot be empty',
          },
        },
      },
      TeamsId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'Team Id cannot be empty',
          },
          notEmpty: {
            msg: 'Team Id cannot be empty',
          },
        },
      },
      updatedBy: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: 'UpdatedBy cannot be empty',
          },
          notEmpty: {
            msg: 'UpdatedBy cannot be empty',
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'History',
    }
  );
  return History;
};

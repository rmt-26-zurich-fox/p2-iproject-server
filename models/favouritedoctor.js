"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class FavouriteDoctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      FavouriteDoctor.belongsTo(models.User, { foreignKey: "userId" });
    }
  }
  FavouriteDoctor.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "User Id is required",
          },
          notNull: {
            msg: "User Id is required",
          },
        },
      },
      doctorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Doctor Id is required",
          },
          notNull: {
            msg: "Doctor Id is required",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "FavouriteDoctor",
    }
  );
  return FavouriteDoctor;
};

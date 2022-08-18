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
      FavouriteDoctor.belongsTo(models.User, { foreignKey: "doctorId" });
    }
  }
  FavouriteDoctor.init(
    {
      doctorId: DataTypes.INTEGER,
      vote: { type: DataTypes.INTEGER, defaultValue: 0 },
    },
    {
      sequelize,
      modelName: "FavouriteDoctor",
    }
  );
  return FavouriteDoctor;
};

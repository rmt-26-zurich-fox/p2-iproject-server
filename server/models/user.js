"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: "UserId" });
      User.hasMany(models.Service, { foreignKey: "UserId" });
      User.hasMany(models.ProductRequest, { foreignKey: "UserId" });
      User.hasMany(models.ServiceRequest, { foreignKey: "UserId" });
    }
  }
  User.init(
    {
      name: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false },
      password: { type: DataTypes.STRING, allowNull: false },
      phoneNumber: { type: DataTypes.INTEGER, allowNull: false },
      address: { type: DataTypes.STRING },
      role: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};

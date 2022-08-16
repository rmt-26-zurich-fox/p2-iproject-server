"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductRequest.belongsTo(models.User, { foreignKey: "UserId" });
      ProductRequest.belongsTo(models.Product, { foreignKey: "ProductId" });
    }
  }
  ProductRequest.init(
    {
      ProductId: { type: DataTypes.INTEGER, allowNull: false },
      UserId: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      sequelize,
      modelName: "ProductRequest",
    }
  );
  return ProductRequest;
};

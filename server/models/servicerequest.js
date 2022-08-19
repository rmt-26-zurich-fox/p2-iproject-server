"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ServiceRequest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ServiceRequest.belongsTo(models.User, { foreignKey: "UserId" });
      ServiceRequest.belongsTo(models.Service, { foreignKey: "ServiceId" });
    }
  }
  ServiceRequest.init(
    {
      ServiceId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    {
      sequelize,
      modelName: "ServiceRequest",
    }
  );
  return ServiceRequest;
};

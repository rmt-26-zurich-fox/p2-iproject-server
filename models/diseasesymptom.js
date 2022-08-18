"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiseaseSymptom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DiseaseSymptom.belongsTo(models.Disease, { foreignKey: "diseaseId" });
      DiseaseSymptom.belongsTo(models.Symptom, { foreignKey: "symptomId" });
    }
  }
  DiseaseSymptom.init(
    {
      diseaseId: DataTypes.INTEGER,
      symptomId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "DiseaseSymptom",
    }
  );
  return DiseaseSymptom;
};

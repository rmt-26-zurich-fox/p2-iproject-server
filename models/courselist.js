"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CourseList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CourseList.belongsTo(models.User);
      CourseList.belongsTo(models.Course);
    }
  }
  CourseList.init(
    {
      UserId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "CourseList",
    }
  );
  return CourseList;
};

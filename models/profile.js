'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.belongsToMany(models.Product, { through: models.Order })
    }
  }
  Profile.init({
    firstName: {
      type: DataTypes.STRING,
      defaultValue: "Input First Name"
    },
    lastName: {
      type: DataTypes.STRING,
      defaultValue: "Input Last Name"
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: "Input Address"
    },
    phoneNumber: {
      type: DataTypes.STRING,
      defaultValue: "Input Phonenumber"
    },
    editStatus: {
      type: DataTypes.STRING,
      defaultValue: "No",
      validate: {
        isIn: {
          args: [['Yes', 'No', 'Guest']],
          msg: "Must be Yes or No"
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User is required"
        },
        notEmpty: {
          msg: "User is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};
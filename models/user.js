'use strict';
const {
  Model
} = require('sequelize');
const { hashPassword } = require('../helpers/bcrypt');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsToMany(models.Category, {
        through: models.Post,
        foreignKey: 'UserId'
      })

      User.hasMany(models.Favorite, {
        foreignKey: 'UserId'
      })
    }
  }
  User.init({
    username: {
      type : DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Username is required'
        },
        notEmpty: {
          msg: 'Username is required'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true, 
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        notEmpty: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Invalid Email format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        notEmpty: {
          msg: 'Password is required'
        }
      }
    },
    role: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role is required"
        },
        notEmpty: {
          msg: "Role is required"
        }
      }
    },
    phoneNumber: { 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "PhoneNumber is required"
        },
        notEmpty: {
          msg: "PhoneNumber is required"
        }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Address is required"
        },
        notEmpty: {
          msg: "Address is required"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((instance, option) => {

    instance.password = hashPassword(instance.password)
  })
  return User;
};
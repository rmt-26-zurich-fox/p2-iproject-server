'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.belongsToMany(models.Profile, { through: models.Order })
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password is required"
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 5000,
        notNull: {
          msg: "Price is required"
        },
        notEmpty: {
          msg: "Price is required"
        },
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: [0],
        notNull: {
          msg: "Stock is required"
        },
        notEmpty: {
          msg: "Stock is required"
        },
      }
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: [0],
        notNull: {
          msg: "Weight is required"
        },
        notEmpty: {
          msg: "Weight is required"
        },
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image URL is required"
        },
        notEmpty: {
          msg: "Image URL is required"
        },
      }
    },
    productStatus: {
      type: DataTypes.STRING,
      defaultValue: "Active",
      validate: {
        isIn: {
          args: [['Active', 'Inactive']],
          msg: "Must be Active or Inactive"
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
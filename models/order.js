'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Profile)
      Order.belongsTo(models.Product)
    }
  }
  Order.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    orderStatus: {
      type: DataTypes.STRING,
      defaultValue: "Cart",
      validate: {
        isIn: {
          args: [['Cart', 'Payed', 'Done']],
          msg: "Must be Cart, Payed or Done"
        }
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
    totalCost: {
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
    ProfileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Profile is required"
        },
        notEmpty: {
          msg: "Profile is required"
        },
      }
    },
    ProductId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Product is required"
        },
        notEmpty: {
          msg: "Product is required"
        },
      }
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.User, {foreignKey: "UserId"})
      Item.belongsTo(models.Supplier, {foreignKey: "SupplierId"})
    }
  }
  Item.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Item Name is required"
        },
        notEmpty: {
          msg: "Item Name cannot empty"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Description is required"
        },
        notEmpty: {
          msg: "Description cannot empty"
        }
      }
    },
    buyPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Buy Price is required"
        },
        notEmpty: {
          msg: "Buy Price cannot empty"
        }
      }
    },
    sellPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Sell Price is required"
        },
        notEmpty: {
          msg: "Sell Price cannot empty"
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Stock is required"
        },
        notEmpty: {
          msg: "Stock cannot empty"
        }
      }
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Image Url is required"
        },
        notEmpty: {
          msg: "Image Url cannot empty"
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'active',
      validate: {
        notNull: {
          msg: 'status is required'
        },
        notEmpty: {
          msg: 'status cannot empty'
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "User Id is required"
        },
        notEmpty: {
          msg: "User Id cannot empty"
        }
      }
    },
    SupplierId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Supplier Id is required"
        },
        notEmpty: {
          msg: "Supplier Id cannot empty"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Item',
  });
  return Item;
};
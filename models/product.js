'use strict';
const {
  Model, Op
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
      Product.hasMany(models.ShoppingCart)
    }
    
    static filterProduct(search, page, size){
      if(typeof page === "undefined" ){
        page = 1
      }
      if(isNaN(page) || page < 1 || Number.isNaN(page)){
        page = 1
      }
      if(typeof size === "undefined"){
       size = 9
      }
      if(typeof size !== 'number' && size < 0 && size>9){
          size =  9
      }

      let options = {
        order:[['createdAt', 'DESC']],
        limit: size,
        offset: (page - 1) * size
        
      }
      if(search){
        options.where = {
          name: {
            [Op.iLike]: `%${search}%`, 
          }
        }
      }

      return {options, currentPage: page}
    }
  }
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: `Fill up the title`
        },
        notEmpty:{
          msg: `Fill up the title`
        },
      }
    },
    imgUrl: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: `Fill up the Image Url`
        },
        notEmpty:{
          msg: `Fill up the Image Url`
        }
      }
      },
    material: {
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {
          msg: `Fill up the material`
        },
        notEmpty:{
          msg: `Fill up the material`
        }
      }
    },
    stock: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: `Fill up the stock`
        },
        notEmpty:{
          msg: `Fill up the Price`
        },
      }
    },
    price: {
      type:DataTypes.INTEGER,
      allowNull: false,
      validate:{
        notNull: {
          msg: `Fill up the Price`
        },
        notEmpty:{
          msg: `Fill up the Price`
        },
        min: 1000000,
      }
    },
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};
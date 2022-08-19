const { Product, Cart } = require("../models");
const axios = require("axios");

class productController {
  static async getProducts(req, res) {
    try {
      const allProducts = await Product.findAll();
      if (allProducts) {
        res.status(200).json(allProducts);
      } else if (allProducts.length === 0) {
        throw { name: "not found" };
      }
    } catch (error) {
      if (error.name === "not found") {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async getOneProduct(req, res) {
    try {
      const { productId } = req.params;
      const oneProduct = await Product.findByPk(productId);
      if (oneProduct) res.status(200).json(oneProduct);
      else throw { name: "not found" };
    } catch (error) {
      if (error.name === "not found") {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async addtoCart(req, res) {
    try {
      // console.log(req.headers);
      const { productId } = req.params;
      const findProduct = await Product.findByPk(productId);
      if (findProduct) {
        try {
          const addedToCart = await Cart.create({
            userId: req.loggedUser.id,
            productId,
            price: findProduct.price,
          });
          if (addedToCart) {
            res.status(201).json({
              message: `Success adding product with id ${addedToCart.productId} to cart!`,
            });
          } else {
            throw { name: "not found" };
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      //   console.log(error);
      if (error.name === "not found") {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async getCart(req, res) {
    try {
      const cartContent = await Cart.findAll({
        where: {
          userId: req.loggedUser.id,
        },
        include: [Product],
      });
      if (cartContent) {
        res.status(200).json(cartContent);
      } else if (cartContent.length === 0) {
        throw { name: "not found" };
      }
    } catch (error) {
      if (error.name === "not found") {
        res.status(404).json({ message: "Cart is still empty!" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async createProduct(req, res) {
    const { name, type, description, price, imageUrl1, imageUrl2, videolink } =
      req.body;
    try {
      const createdProduct6 = await Product.create({
        name,
        type,
        description,
        price,
        imageUrl1,
        imageUrl2,
        videolink,
      });
      res.status(201).json({ message: "Product added successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { productId } = req.params;
      const deleteProduct = await Product.destroy({
        where: {
          id: productId,
        },
      });
      if (deleteProduct)
        res.status(200).json({ message: "Product deleted successfully" });
      else throw { name: "not found" };
    } catch (error) {
      if (error.name === "not found") {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async deleteItemFromCart(req, res) {
    try {
      const { cartId } = req.params;
      const deleteItem = await Cart.destroy({
        where: {
          id: cartId,
          userId: req.loggedUser.id,
        },
      });
      if (!deleteItem) {
        throw { name: "not found" };
      } else {
        res.status(200).json({
          message: `Cart item with id ${cartId} is successfully removed`,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.name === "not found") {
        res.status(404).json({ message: "Product not found" });
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }

  static async emptyCart(req, res) {
    try {
      const empty = await Cart.destroy({
        where: {
          userId: req.loggedUser.id,
        },
      });

      if (empty) {
        res.status(200).json({ message: "checkout succesful" });
      } else if (empty.length === 0) {
        throw { name: "cannot checkout an empty cart" };
      }
    } catch (error) {
      if (error.name === "cannot checkout an empty cart") {
        res.status(404).json({ message: "cart is empty already" });
      }
    }
  }

  static async getTotalPrice(req, res) {
    try {
      const totalPrice = await Cart.sum("price", {
        where: {
          userId: req.loggedUser.id,
        },
      });
      // console.log(totalPrice);
      if (totalPrice) {
        res.status(200).json(totalPrice);
      } else if (totalPrice === null) {
        res.status(200).json(0);
      }
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getProvince(req, res) {
    try {
      const province = await axios({
        method: "GET",
        url: `https://api.rajaongkir.com/starter/province`,
        headers: {
          key: process.env.RAJAONGKIR,
        },
      });
      res.status(200).json(province.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  }

  static async getCity(req, res) {
    try {
      const city = await axios({
        method: "GET",
        url: `https://api.rajaongkir.com/starter/city`,
        headers: {
          key: process.env.RAJAONGKIR,
        },
      });
      res.status(200).json(city.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  }

  static async getdeliveryFee(req, res) {
    try {
      const { origin, destination, weight, courier } = req.body;
      // console.log(req.body);
      const cost = await axios({
        method: "post",
        url: `https://api.rajaongkir.com/starter/cost`,
        headers: {
          key: process.env.RAJAONGKIR,
        },
        data: {
          origin,
          destination,
          weight,
          courier,
        },
      });
      res.status(200).json(cost.data.rajaongkir.results);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = productController;

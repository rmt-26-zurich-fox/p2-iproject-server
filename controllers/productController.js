const e = require("cors");
const { Product, Cart } = require("../models");

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
      const { id } = req.params;
      const oneProduct = await Product.findByPk(id);
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
      const addedToCart = await Cart.create({
        userId: req.loggedUser.id,
        productId,
      });
      if (addedToCart) {
        res.status(201).json({
          message: `Success adding product with id ${addedToCart.productId} to cart!`,
        });
      } else {
        throw { name: "not found" };
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
      //   console.log(error);
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
      const createdNews = await Product.create({
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
          id : cartId,
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
      }
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = productController;

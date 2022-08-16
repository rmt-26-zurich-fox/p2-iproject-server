const productRouter = require("express").Router();
const ProductController = require("../controllers/product-controller");

productRouter.get("/products", ProductController.getProduct);

module.exports = productRouter;

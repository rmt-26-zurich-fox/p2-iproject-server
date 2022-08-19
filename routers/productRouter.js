const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controllers/ProductController");

productRouter.get("/", ProductController.showAllProduct);

module.exports = productRouter;

const express = require("express");
const productRouter = express.Router();
const ProductController = require("../controllers/ProductController");

productRouter.get("/", async (req, res) => {
  res.send("hello dari product");
});

module.exports = productRouter;
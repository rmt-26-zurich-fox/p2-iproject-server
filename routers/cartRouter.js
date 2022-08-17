const express = require("express");
const cartRouter = express.Router();
const CartController = require("../controllers/CartController");

cartRouter.patch("/:ProductId", CartController.createCart);
cartRouter.get("/", CartController.getCart);
cartRouter.delete("/:id", CartController.deleteCart);

module.exports = cartRouter;

const express = require("express");
const cartRouter = express.Router()
const CartController = require("../controllers/CartController");
const cart = require("../models/cart");

cartRouter.patch("/:ProductId", CartController.createCart)
cartRouter.get('/', CartController.getCart)

module.exports = cartRouter
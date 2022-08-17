const express = require("express");
const cartRouter = express.Router()
const CartController = require("../controllers/CartController")

cartRouter.patch("/:ProductId", CartController.createCart)

module.exports = cartRouter
const express = require("express");
const transactionRouter = express.Router()
const TransactionController = require('../controllers/TransactionController')

transactionRouter.patch('/checkout', TransactionController.checkout)

module.exports = transactionRouter
const express = require("express");
const transactionRouter = express.Router()
const TransactionController = require('../controllers/TransactionController')

transactionRouter.patch('/checkout', TransactionController.checkout)
transactionRouter.get('/', TransactionController.getTransaction)
transactionRouter.patch('/:id', TransactionController.payment)

module.exports = transactionRouter
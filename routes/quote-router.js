const QuoteController = require('../controllers/quote-controller')

const quoteRouter = require('express').Router()

quoteRouter.get('/programming/quotes', QuoteController.allProgrammerQuote)
quoteRouter.get('/anime/quotes', QuoteController.allAnimeQuote)


module.exports = quoteRouter
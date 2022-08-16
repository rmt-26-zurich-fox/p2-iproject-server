const QuoteController = require('../controllers/quote-controller')

const quoteRouter = require('express').Router()

quoteRouter.get('/', QuoteController.allQuotes)
quoteRouter.post('/', QuoteController.createQuote)
quoteRouter.get('/programming', QuoteController.allProgrammerQuote)
quoteRouter.get('/anime', QuoteController.allAnimeQuote)


module.exports = quoteRouter
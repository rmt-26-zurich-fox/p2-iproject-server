const QuoteController = require('../controllers/quote-controller')
const { authentication } = require('../middlewares/auth')

const quoteRouter = require('express').Router()

quoteRouter.get('/', QuoteController.allQuotes)
quoteRouter.post('/', authentication, QuoteController.createQuote)
quoteRouter.get('/programming', authentication, QuoteController.allProgrammerQuote)
quoteRouter.get('/anime', authentication, QuoteController.allAnimeQuote)
quoteRouter.get('/qotd', QuoteController.quoteOfTheDay)
quoteRouter.get('/discord', QuoteController.tesDiscord)


module.exports = quoteRouter
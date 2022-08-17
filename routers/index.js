const router = require("express").Router()
const itemRouter = require('./item.js')
const userRouter = require('./user.js')
const cartRouter = require('./cart.js')
const { checkLogin } = require('../middlewares/authentication')
const historyRouter = require('./history')
const ApiController = require("../controllers/apiController.js")
const itemController = require('../controllers/itemController')

router.get('/news', ApiController.getNews)
router.get('/time', ApiController.getTime)
router.get('/weather', ApiController.getWeather)

router.get('/items/filter', itemController.itemFilter)

router.use('/users', userRouter)
router.use('/items', itemRouter)

router.use(checkLogin)

router.use('/cart', cartRouter)
router.use('/history', historyRouter)

module.exports = router
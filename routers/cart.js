const { checkLogin } = require('../middlewares/authentication')
const ItemController =  require('../controllers/itemController')
const router = require("express").Router()


router.get('/', ItemController.listCart)
router.post('/:id', ItemController.addToCart)
router.delete('/:id', ItemController.deleteCart)

module.exports = router
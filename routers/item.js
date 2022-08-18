const ItemController = require('../controllers/itemController')
const router = require("express").Router()
const {authorization, adminAuthorization, customerAuthorization} = require('../middlewares/authorization')
const { checkLogin } = require('../middlewares/authentication')

router.get('/', ItemController.itemList)
router.get('/:id', ItemController.itemDetail)
router.get('/page', ItemController.itemPagination)

router.use(checkLogin)

router.post('/add', adminAuthorization,ItemController.addItem)
router.put('/:id', adminAuthorization,ItemController.updateItem)
router.delete('/delete/:id', adminAuthorization,ItemController.deleteItem)

module.exports = router
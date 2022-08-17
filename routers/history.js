const router = require('express').Router()
const HistoryController = require('../controllers/historyController')
const { adminAuthorization } = require('../middlewares/authorization')

router.get('/list', adminAuthorization,HistoryController.listHistory)

module.exports = router
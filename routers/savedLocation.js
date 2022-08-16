const router = require('express').Router()
const SavedLocationController = require('../controllers/savedLocationController')

router.get('/', SavedLocationController)
router.post('/', SavedLocationController)
router.delete('/:savedId', SavedLocationController)

module.exports = router
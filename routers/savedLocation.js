const router = require('express').Router()
const SavedLocationController = require('../controllers/savedLocationController')

router.post('/', SavedLocationController.createSavedLocation)
router.get('/', SavedLocationController.readSavedLocation)
router.get('/:savedId', SavedLocationController.readSavedWeatherById)
router.delete('/:savedId', SavedLocationController.deleteSavedLocationById)

module.exports = router
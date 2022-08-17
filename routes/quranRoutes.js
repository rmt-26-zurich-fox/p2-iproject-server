const router = require('express').Router()
const Controller = require('../controllers/quranController')

router.get('/quran', Controller.allSurah)

module.exports = router
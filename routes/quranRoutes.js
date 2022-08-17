const router = require('express').Router()
const Controller = require('../controllers/quranController')

router.get('/quran', Controller.allSurah)
router.get('/quran/:surahId', Controller.fetchSurahbyId)

module.exports = router
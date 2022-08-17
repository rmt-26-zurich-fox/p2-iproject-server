const router = require('express').Router()
const Controller = require('../controllers/quranController')

router.get('/', Controller.allSurah)
router.get('/:surahId', Controller.fetchSurahbyId)
router.get('/:surahId/:ayah', Controller.ayahInSurah)

module.exports = router
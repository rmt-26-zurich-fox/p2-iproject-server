const router = require('express').Router()
const quranRoutes = require('./quranRoutes')

router.use('/quran', quranRoutes)

module.exports = router
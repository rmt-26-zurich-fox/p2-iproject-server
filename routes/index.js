const router = require('express').Router()
const quranRoutes = require('./quranRoutes')

router.use(quranRoutes)

module.exports = router
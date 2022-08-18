const { bmi, fatPercent, bmr } = require('../controllers/health')
const router = require('express').Router()

// Food
router.post('/bmi', bmi)
router.post('/fat-percentage', fatPercent)
router.post('/bmr', bmr)

module.exports = router
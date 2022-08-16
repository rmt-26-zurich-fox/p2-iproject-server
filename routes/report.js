const router= require('express').Router();
const Controller= require('../controllers/reportController');

router.get('/reports')
router.post('/reports')
router.put('/reports/:reportId')



module.exports= router
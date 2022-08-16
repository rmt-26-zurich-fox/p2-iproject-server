const router= require('express').Router();
const Controller= require('../controllers/reportController');

router.get('/reports', Controller.getAllReport)
router.get('/reports/:id', Controller.reportById)
router.post('/reports')
router.put('/reports/:reportId')



module.exports= router
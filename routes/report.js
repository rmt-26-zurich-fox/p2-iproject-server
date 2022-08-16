const router= require('express').Router();
const Controller= require('../controllers/reportController');

router.get('/reports', Controller.getAllReport)
router.get('/reports/:id', Controller.reportById)
router.post('/reports', Controller.addReport)
router.put('/reports/:reportId', Controller.updateReport)



module.exports= router
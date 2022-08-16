const router= require('express').Router();
const Controller= require('../controllers/reportController');

router.get('/reports', Controller.getAllReport)
router.post('/reports', Controller.addReport)
router.get('/reports/:id', Controller.reportById)
router.delete('/reports/:id', Controller.deleteReport)
router.put('/reports/:reportId', Controller.updateReport)



module.exports= router
const router= require('express').Router();
const userRouter= require('./user');
const reportRouter= require('./report');
const {Authentication} = require('../middlewares/authentication');

router.use('/',userRouter)
router.use(Authentication)
router.use('/',reportRouter)



module.exports= router
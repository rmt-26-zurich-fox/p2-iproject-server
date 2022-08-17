const router = require('express').Router();
const userRouter = require('./user');

router.use('/user', userRouter);
router.get('/standings');
router.get('/ucl');
router.get('/teams');
//authentication
router.post('/teamsFavourite/:id');
router.get('/teamsFavourite');

module.exports = router;

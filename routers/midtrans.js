const MidtransController = require('../controllers/midtransController');
const router = require('express').Router();

// Snap Midtrans
router.post('/snap-token', MidtransController.generateSnapToken)

router.patch('/change-cart-to-payed', MidtransController.updateStatusCartToPayed)

module.exports = router;
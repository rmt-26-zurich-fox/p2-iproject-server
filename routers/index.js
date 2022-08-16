const router = require('express').Router();
const routerRegister = require('./register');
const routerLogin = require('./login');
const routerProfile = require('./profile');
const routerAdmin = require('./admin');
const routerCustomer = require('./customer');
const errorHandler = require('../middlewares/errorHandler');
const { isLoggedIn } = require('../middlewares/authentication');
const { authorizeByAdmin, authorizeByAdminOrCustomer } = require('../middlewares/authorization');

//Route Register
router.use("/register", routerRegister);

//Route Login
router.use("/login", routerLogin);

//Middleware Authentication Login
router.use(isLoggedIn);

//Only Admin and User can edit Profile
router.use("/profiles", authorizeByAdminOrCustomer, routerProfile); //PUT Profile standart

// Atur di Vue aja
// Authorize Profile -> Cek status edit udah belum -> Untuk semua route // Guest status already Yes, Last

router.use("/admins", authorizeByAdmin, routerAdmin); //Midleware role Admin
router.use("/customers", routerCustomer); //Midleware role Inside

router.use(errorHandler);

module.exports = router;
const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');
const router = require('express').Router();
const { authorizeByCustomer, authorizeByCustomerOrGuest } = require('../middlewares/authorization');

// Auth : Guest Customer, List Product Active, Descending : createdAt
router.get('/products/list-active', authorizeByCustomerOrGuest, ProductController.customerListProduct) //Midle role Customer & Guest
router.get('/products/list-active-pagination', authorizeByCustomerOrGuest, ProductController.customerListProductPagination) //Midle role Customer & Guest

// Show Product Detail
router.get('/products/detail/:id', ProductController.customerDetailProduct)

// Midleware role Customer
router.use(authorizeByCustomer);

// Buat masukin ke cart pakai page detail product
// Add Product to Cart, Product ID from params <===--- Kurangi stock Product inside
router.post('/orders/add/:id', OrderController.customerAddOrder)

// Get Product with status Cart from Cust ID dari access_token / req.user.profile_id
router.get('/orders/cart', OrderController.customerListCart)

// Cara bayar di client
// Change Product status from Cart to Payed, Cust ID dari access_token / req.user.profile_id & Product ID edit status abis payment
// router.patch('/orders/status/:id')

// Delete Product from Cart, Cust ID dari access_token / req.user.profile_id & Order ID dari params id  <===--- Tambahkan stock Product inside
router.delete('/orders/delete/:id', OrderController.customerCancellOrder)

// Get Product with status Payed and Done from Cust ID dari access_token / req.user.profile_id
router.get('/orders/list', OrderController.customerListOrder)

module.exports = router;
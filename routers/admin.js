const ProductController = require('../controllers/productController');
const OrderController = require('../controllers/orderController');
const router = require('express').Router();

// All Auth Admin
// List Product Admin, Descending : updatedAt
router.get('/products/list', ProductController.adminListProduct)

// Add New Product Admin
router.post('/products/add', ProductController.adminAddProduct)

// Edit Product, Product ID from params
router.put('/products/edit/:id', ProductController.adminEditProduct)

// Edit Product Status -- SOFT DELETE : Active Inactive --, Product ID from params
router.patch('/products/status/:id', ProductController.adminEditProductStatus)

// List Order, Descending : createdAt
router.get('/orders/list', OrderController.adminListOrder)

// Edit Status Order, Status Change Payed and Done only, Order id from params
router.patch('/orders/status/:id', OrderController.adminEditOrderStatus)

module.exports = router;
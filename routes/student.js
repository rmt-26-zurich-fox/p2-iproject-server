const express = require("express");
const InvoiceController = require("../controllers/invoicecontroller");
const StudentController = require("../controllers/studentcontroller");
const router = express.Router();

router.post("/shopping-cart", StudentController.fetchShoppingCart);
router.post("/shopping-cart/:courseId", StudentController.addShoppingCart);
router.get("/checkout", InvoiceController.checkout);
module.exports = router;

const express = require("express");
const InvoiceController = require("../controllers/invoicecontroller");
const StudentController = require("../controllers/studentcontroller");
const router = express.Router();

router.get("/shopping-cart", StudentController.fetchShoppingCart);
router.post("/courselist/add", StudentController.addToCourseList);
router.post("/shopping-cart/:courseId", StudentController.addShoppingCart);
router.delete("/shopping-cart/:courseId/delete");
router.get("/checkout", InvoiceController.checkout);
module.exports = router;

const express = require("express");
const InvoiceController = require("../controllers/invoicecontroller");
const StudentController = require("../controllers/studentcontroller");
const router = express.Router();

router.get("/shopping-cart", StudentController.fetchShoppingCart);
router.get("/courselist", StudentController.fetchCourseList);
router.post("/courselist/:courseId/add", StudentController.addToCourseList);
router.post("/shopping-cart/:courseId", StudentController.addShoppingCart);
router.delete("/shopping-cart/delete", StudentController.deleteShoppingCart);
router.get("/checkout", InvoiceController.checkout);
module.exports = router;

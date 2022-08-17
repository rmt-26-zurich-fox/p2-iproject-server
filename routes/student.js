const express = require("express");
const StudentController = require("../controllers/studentcontroller");
const router = express.Router();

router.post("/shopping-cart/:courseId", StudentController.addShoppingCart);
module.exports = router;

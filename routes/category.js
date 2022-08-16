const CategoryController = require("../controller/categoryController");
const router = require("express").Router();

router.get("/", CategoryController.getAllCategories)

module.exports = router;
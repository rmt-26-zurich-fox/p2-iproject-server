const UserController = require("../controller/userController");
const router = require("express").Router();

// Admin
router.post("/register/admin", UserController.registerAdmin);

// Visitor
router.post("/register", UserController.registerVisitor);

module.exports = router;
const UserController = require("../controller/userController");
const router = require("express").Router();

// Admin
router.post("/register/admin", UserController.registerAdmin);

// Visitor
router.post("/register", UserController.registerVisitor);

// Global
router.post("/login", UserController.loginUsers);

// Global
router.post("/login", UserController.loginUsers);

module.exports = router;
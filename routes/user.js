const router = require("express").Router();

// Admin

// Visitor

// Global
router.post("/login", UserController.loginUsers);

module.exports = router;
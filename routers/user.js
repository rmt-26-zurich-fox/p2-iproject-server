const Controller = require("../controllers/controllerUser")
const router = require("express").Router()

router.post("/register", Controller.register)
router.post("/login", Controller.login)
router.post("/googleLogin", Controller.googlelogin)

module.exports = router
const Controller = require("../controllers/controllerUser")
const router = require("express").Router()

router.post("/register", Controller.register)

module.exports = router
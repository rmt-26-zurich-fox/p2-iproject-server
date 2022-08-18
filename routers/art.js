const Controller = require("../controllers/controllerArt")

const router = require("express").Router()

router.use("/", Controller.arts)

module.exports = router
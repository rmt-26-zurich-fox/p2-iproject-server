const Controller = require("../controllers/controllerPlanning")

const router = require("express").Router()

router.get("/", Controller.plannings)
router.delete("/:id", Controller.deletePlanning)
router.post("/:id", Controller.postPlanning)

module.exports = router
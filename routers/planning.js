const Controller = require("../controllers/controllerPlanning")

const router = require("express").Router()

router.get("/:id", Controller.comment)
router.post("/:id", Controller.postComment)


module.exports = router
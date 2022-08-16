const Controller = require("../controllers/controllerComment")
const { auth } = require("../middlewares/authentication")
const router = require("express").Router()

router.get("/:id", Controller.comments)

router.use(auth)

router.post("/:id", Controller.postComment)

module.exports = router
const {artController} = require("../controllers/artController")
const router = require("express").Router()

// router.get("/", artController.arts)
router.get("/", artController.art)
router.get("/genres", artController.genres)
// router.post("/", artController.createart)
// router.get("/:id", authorization, artController.showartById)
// router.put("/:id", authorization, artController.updateart)
// router.patch("/:id", checkAdmin, artController.updateStatus)
// router.delete("/:id", authorization, artController.deleteartById)

module.exports = router
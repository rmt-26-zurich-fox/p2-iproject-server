const Controller = require("../controllers/controllerAnime")
const { route } = require("./user")

const router = require("express").Router()

router.get("/top", Controller.topAnime)
router.get("/:season", Controller.fetchAnime)
router.get("/details/:animeId", Controller.animeDetails)


module.exports = router
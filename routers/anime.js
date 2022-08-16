const Controller = require("../controllers/controllerAnime")

const router = require("express").Router()

router.get("/winter", Controller.fetchWinter)
router.get("/spring", Controller.fetchSpring)
router.get("/summer", Controller.fetchSummer)
router.get("/fall", Controller.fetchFall)
router.get("/top", Controller.topAnime)


module.exports = router
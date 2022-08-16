const router = require("express").Router();
const Controller = require("../controllers");

router.get("/genres", Controller.genres)
router.get("/", Controller.findMovie)
router.get("/trending", Controller.trendingMovie)
router.get("/:id", Controller.detailMovie)
router.get("/:id/trailer", Controller.movieTrailer)

module.exports = router;

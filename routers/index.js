const router = require("express").Router();
const Controller = require("../controllers");

router.get("/genres", Controller.genres)
router.get("/movies", Controller.findMovie)
router.get("/movies/trending", Controller.trendingMovie)
router.get("/movies/:id", Controller.detailMovie)
router.get("/movies/:id/trailer", Controller.movieTrailer)

module.exports = router;

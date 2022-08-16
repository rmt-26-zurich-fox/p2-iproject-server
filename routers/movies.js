const router = require("express").Router();
const Controller = require("../controllers/movie");

router.get("/", Controller.findMovie)
router.get("/genres", Controller.genres)
router.get("/trending", Controller.trendingMovie)
router.get("/:id", Controller.detailMovie)
router.get("/:id/trailer", Controller.movieTrailer)

module.exports = router;

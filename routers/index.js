const router = require("express").Router();
const movieRouter = require("./movies");
const Controller = require("../controllers");

router.post("/register", Controller.register)
router.post("/login", Controller.login)

router.use("/movies", movieRouter)

module.exports = router;

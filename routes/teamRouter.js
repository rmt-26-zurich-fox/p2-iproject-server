const router = require("express").Router();
const TeamController = require("../controllers/teamController");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

router.get("/:teamId", authentication, TeamController.getSpecificTeam);
router.get("/", authentication, TeamController.getAllTeams);

module.exports = router;

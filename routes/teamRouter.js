const router = require("express").Router();
const TeamController = require("../controllers/teamController");
const PlayerController = require("../controllers/playerController");
const ProfileController = require("../controllers/profileController");
const { authentication, getProfile } = require("../middlewares/authentication");
const {
  authorization,
  dislikeATeamAuthorization,
} = require("../middlewares/authorization");

router.get("/:teamId/players", PlayerController.getPlayersByTeamId);
router.get("/:teamId", authentication, TeamController.getSpecificTeam);
router.post("/:teamId/like", getProfile, ProfileController.likeATeam);
router.get("/users/:profileId", getProfile, TeamController.getLikedTeams);
router.delete(
  "/:teamId/like/:likeId",
  getProfile,
  dislikeATeamAuthorization,
  ProfileController.dislikeATeam
);
router.get("/", authentication, TeamController.getAllTeams);

module.exports = router;

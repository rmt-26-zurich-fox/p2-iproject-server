const router = require("express").Router();
const ProfileController = require("../controllers/profileController");
const { authorization } = require("../middlewares/authorization");

router.post("/create", ProfileController.createProfile);
router.put("/edit/:profileId", authorization, ProfileController.editProfile);
router.get("/:profileId", authorization, ProfileController.findOneProfile);

module.exports = router;

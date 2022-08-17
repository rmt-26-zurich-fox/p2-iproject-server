const router = require("express").Router();
const ProfileController = require("../controllers/profileController");
const { authentication } = require("../middlewares/authentication");
const { authorization } = require("../middlewares/authorization");

router.post("/create", ProfileController.createProfile);
router.put("/edit/:profileId", authorization, ProfileController.editProfile);
router.get("/", authentication, ProfileController.findOneProfile);

module.exports = router;

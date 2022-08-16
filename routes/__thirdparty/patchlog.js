const router = require("express").Router();
const Patchlogs = require("../../controllers/patchlog/patchlogs");

router.get("/", Patchlogs.showAll);
// router.get("/test", Patchlogs.fetchPatchnoteLength);

module.exports = router;

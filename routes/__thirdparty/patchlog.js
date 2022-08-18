const router = require("express").Router();
const Patchlogs = require("../../controllers/patchlog/patchlogs");

router.get("/", Patchlogs.showAll);

module.exports = router;

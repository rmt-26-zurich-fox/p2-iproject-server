const router = require("express").Router();

//!
const warframestat = require("./__thirdparty/warframestats");
const patchlogs = require("./__thirdparty/patchlog");
const items = require("./__thirdparty/items");

//* 3rd party warframestats
router.use("/events", warframestat);
router.use("/patchlogs", patchlogs);
router.use("/items", items);

module.exports = router;

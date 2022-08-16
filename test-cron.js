const Credentials = require("./config/utils_config");
const Patchlogs = require("./controllers/patchlog/patchlogs");
// CRON SETUP
const cron = require("cronitor")(Credentials.cronitorApi());
const nodeCron = require("node-cron");
cron.wraps(nodeCron);

// 0 1 * * * <- 1 hour , 1 minute -> * * * * *
cron.schedule("Patchlogs check", "* * * * *", async function () {
	await Patchlogs.fetchPatchnoteLength();
});

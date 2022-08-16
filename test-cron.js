const Credentials = require("./config/config");
const Patchlogs = require("./controllers/patchlog/patchlogs");
// CRON SETUP
const cron = require("cronitor")(Credentials.cronitorApi());
const nodeCron = require("node-cron");
cron.wraps(nodeCron);

// 0 1 * * * <- 1 hour , 1 minute -> * * * * *
cron.schedule("Patchlogs check", "0 1 * * *", async function () {
	// console.log("Sending welcome email to new sign ups every 1 minutes.");
	await Patchlogs.fetchPatchnoteLength();
});

const Credentials = require("./config/config");

const cron = require("cronitor")(Credentials.cronitorApi());
const nodeCron = require("node-cron");

cron.wraps(nodeCron);

cron.schedule("SendWelcomeEmail", "* * * * *", function () {
	console.log("Sending welcome email to new sign ups every 1 minutes.");
});

/**
 * ! this meant to be used for static data like
 * ? baseURL - for database
 * ? frontEndURL - for frontEnd testing
 * ? KEY - for JWT authentication if there is any
 *
 *
 */

const warframestats_url = "https://api.warframestat.us";
const cronitor_api = "5d5056efad6d4b62b1aaf1161524823a"; //Monitor + Telemetry
const cronitor_api_no_monitor = "39a7b5dfaf25495f848b02016cdc8b13"; //Telemetry only

module.exports = class Credentials {
	static warframestats() {
		return warframestats_url;
	}

	static cronitorApi(params = 1) {
		if (params === 1) return cronitor_api;
		if (params === 2) return cronitor_api_no_monitor;
	}
};

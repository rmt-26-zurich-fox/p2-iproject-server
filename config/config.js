/**
 * ! this meant to be used for static data like
 * ? baseURL - for database
 * ? frontEndURL - for frontEnd testing
 * ? KEY - for JWT authentication if there is any
 *
 *
 */

const warframestats_url = "https://api.warframestat.us";

module.exports = class Credentials {
	static warframestats() {
		return warframestats_url;
	}
};

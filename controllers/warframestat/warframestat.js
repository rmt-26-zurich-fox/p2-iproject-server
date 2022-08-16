const axios = require("axios");
const Credentials = require("../../config/config");

//3rd API warframestat.us
/**
 *!1. all warframestats.us API have this:
 *? 	- parameter : :platform ("pc" "ps4" "xb1" "swi")
 *? 	- query : language= ("de" "es" "fr" "it" "ko" "pl" "pt" "ru" "zh" "en") //! default will be 'en'
 *
 *TODO: get this specific alert
 **   - Construction (Fomorian / Razorback)
 **   - Dark Sectors
 *?   - Global Upgrades (this can be empty)
 *?   - Kuva (not available rn)
 *?   - persistentEnemies (Acolyte ? is this still exists?) //! need to check later
 **   - Simaris
 *?   - void trader (it is maroo's bazaar)
 */

module.exports = class Warframestat {
	//primary data fetch
	//* it is recommended to split primary fetch into their own card
	static async alerts(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/alerts`,
			});

			//! it is possible that there is no alerts
			if (!data.length) {
				res.status(200).json({ response: "There is no alerts" });
				return;
			}

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async cycles(req, res, next) {
		try {
			const { platform } = req.params;

			//! get all timecycle
			const cambion = await axios({ url: Credentials.warframestats() + `/${platform}/cambionCycle` }),
				cetus = await axios({ url: Credentials.warframestats() + `/${platform}/cetusCycle` }),
				vallis = await axios({ url: Credentials.warframestats() + `/${platform}/vallisCycle` }),
				zariman = await axios({ url: Credentials.warframestats() + `/${platform}/zarimanCycle` });

			const response = {
				cetusCycle: cetus.data,
				vallisCycle: vallis.data,
				cambionCycle: cambion.data,
				zarimanCycle: zariman.data,
			};

			res.status(200).json(response);
		} catch (error) {
			next(error);
		}
	}
	static async nightwave(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/nightwave`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async invasions(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/invasions`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async news(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/news`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async syndicate(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/syndicateMissions`,
			});
			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async fissures(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/fissures`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async sortie(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/sortie`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async events(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/events`,
			});

			//! it is possible that there is no events
			if (!data.length) {
				res.status(200).json({ response: "There is no events" });
				return;
			}
			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	//!secondary data fetch
	//* means the data can be joined with another in one card @ frontEnd later
	static async arbitration(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/arbitration`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async railjackOutpost(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/sentientOutposts`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async steelpath(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/steelPath`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async construction(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/constructionProgress`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}

	//!deals data fetch
	//* on here, only deals!
	static async dailyDeals(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/dailyDeals`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
	static async flashSales(req, res, next) {
		try {
			const { platform } = req.params;
			let { data } = await axios({
				url: Credentials.warframestats() + `/${platform}/flashSales`,
			});

			res.status(200).json({ response: data });
		} catch (error) {
			next(error);
		}
	}
};

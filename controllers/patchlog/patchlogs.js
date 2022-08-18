const patchlogs = require("warframe-patchlogs");
const { Patchnote } = require("../../models");

/**
 *? QUESTION
 *TODO: BELOW
 *  - HOW TO MAKE A HEARTBEAT PROGRAM ?
 *    --||-> logic should be <-||--
 *    - make a timer (1hrs) (-can use cronjob- cron is linux based time app)
 *    - if timer is up
 *    - fetch data axios from patchnotes (reverse it, so the oldest will have smallest ID number)
 *    - count it, how many
 *    - if currentDatabase.length < latestFetch.length
 *    - diffLength = latestFetch.length - currentDatabase.length (to produce number)
 *    - startFrom = latestFetch.length - diffLength
 *    - add all data to database from latestFetch[startFrom] up to latestFetch[latestFetch.length-1]
 *    -
 *
 */
/**
 *! 1. Patchlogs will fetch data from our Patchlogs
 *! 2. make a heartbeat function to hit 3rd API for checking new update
 *
 */
module.exports = class Patchlogs {
	static async showAll(req, res, next) {
		try {
			// res.status(200).json({ length: patchlogs.posts.length, data: patchlogs.posts });
			const dataRead = await Patchnote.findAll({
				limit: 10,
				attributes: { exclude: ["createdAt", ["updatedAt"]] },
			});
			console.log(dataRead[dataRead.length - 1].dataValues.id);
			res.status(200).json({ response: dataRead.reverse() });
		} catch (error) {
			next(error);
		}
	}

	static async fetchPatchnoteLength(req, res, next) {
		try {
			// - fetch data axios from patchnotes (reverse it, so the oldest will have smallest ID number)
			const latestPatchlogs = patchlogs.posts;
			// - count it, how many
			const currentPatchnoteDatabase = await Patchnote.findAndCountAll();
			// - if currentDatabase.length < latestPatchlogs.length
			if (currentPatchnoteDatabase.count < latestPatchlogs.length) {
				// - diffLength = latestPatchlogs.length - currentPatchnoteDatabase.length (to produce number)
				let diffLength = Math.abs(latestPatchlogs.length - currentPatchnoteDatabase.count),
					//
					startFrom = latestPatchlogs.length - diffLength,
					//
					strippedPatchlogs = latestPatchlogs.reverse().filter((data, index) => {
						if (index >= startFrom) {
							return data;
						}
					});

				//add data strippedPatchLogs to database
				console.log(...strippedPatchlogs);
				strippedPatchlogs.forEach(data => {
					Patchnote.create({ ...data })
						.then(data => console.log(data.dataValues))
						.catch(error => console.log(error));
				});

				console.log({
					length: { current: currentPatchnoteDatabase.count, latest: latestPatchlogs.length },
					response: strippedPatchlogs,
				});
				return;
			}
			console.log({ message: "there is no update" });
		} catch (error) {
			next(error);
		}
	}
};

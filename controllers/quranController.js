const axios = require("axios");
const baseUrl = "https://quran-endpoint.vercel.app/";

class Controller {
  static async allSurah(req, res, next) {
    try {
      const fullQuran = await axios({
        method: "GET",
        url: baseUrl + "quran",
      });
      res.status(200).json(fullQuran.data);
    } catch (error) {
      next(error)
    }
  }

  static async fetchSurahbyId(req, res, next) {
    try {
      const { surahId } = req.params;
      if (surahId >= 114) {
        throw { name: "Data not found" };
      }
      const surah = await axios({
        method: "GET",
        url: baseUrl + `quran/${surahId}`,
      });
      res.status(200).json(surah.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

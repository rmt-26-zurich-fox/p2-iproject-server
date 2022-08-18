const axios = require("axios");
const baseUrl = "https://quran-endpoint.vercel.app/quran";

class Controller {
  static async allSurah(req, res, next) {
    try {
      const fullQuran = await axios({
        method: "GET",
        url: baseUrl,
      });
      res.status(200).json(fullQuran.data);
    } catch (error) {
      next(error);
    }
  }

  static async fetchSurahbyId(req, res, next) {
    try {
      const { surahId } = req.params;
      if (surahId > 114) {
        throw { name: "Data not found" };
      }
      const surah = await axios({
        method: "GET",
        url: baseUrl + `/${surahId}`,
      });
      res.status(200).json(surah.data);
    } catch (error) {
      next(error);
    }
  }

  static async ayahInSurah(req, res, next) {
    try {
      const { surahId, ayah } = req.params;

      const fetchAyah = await axios({
        method: "GET",
        url: baseUrl + `/${surahId}/${ayah}`,
      });

      if (fetchAyah.data.status === 404 || fetchAyah === "undefined") {
        throw { name: "Data not found" };
      }
      res.status(200).json(fetchAyah.data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

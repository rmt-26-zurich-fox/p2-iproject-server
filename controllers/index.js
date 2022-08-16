const axios = require("axios");

class Controller {
  static async findMovie(req, res, next) {
    try {
      const { search } = req.body;
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/search/movie",
        {
          params: {
            api_key: "05190277617ad5aa6569afc189bf57d3",
            query: search,
            page: 1,
            include_adult: true,
          },
        }
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async detailMovie(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/movie/" + id,
        {
          params: {
            api_key: "05190277617ad5aa6569afc189bf57d3",
          },
        }
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async trendingMovie(req, res, next) {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/trending/movie/week",
        {
          params: {
            api_key: "05190277617ad5aa6569afc189bf57d3",
            page: 1,
          },
        }
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async movieTrailer(req, res, next) {
    try {
      const { id } = req.params;
      const { data } = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/videos`,
        {
          params: {
            api_key: "05190277617ad5aa6569afc189bf57d3",
          },
        }
      );
      data.results = data.results.filter(el => el.type === "Trailer")
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async genres(req, res, next) {
    try {
      const { data } = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list",
        { params: { api_key: "05190277617ad5aa6569afc189bf57d3" } }
      );
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

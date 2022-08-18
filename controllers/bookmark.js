const { Bookmark, Movie } = require("../models");

class Controller {
  static async addBookmark(req, res, next) {
    try {
      const UserId = req.user.id;
      const { title, imgUrl, movie_id } = req.body;

      const [findMovie, createdMovie] = await Movie.findOrCreate({
        where: { title },
        defaults: { title, imgUrl, movie_id },
      });

      const MovieId = findMovie.id;

      const [findBookmark, created] = await Bookmark.findOrCreate({
        where: { UserId, MovieId },
        defaults: { UserId, MovieId, status: "Unwatched" },
      });

      if (!created) throw { name: "Already in your bookmarks" };

      res.status(201).json({
        message: `${findMovie.title} successfully added to your bookmarks`,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

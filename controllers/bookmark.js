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
        where: { MovieId },
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

  static async updateBookmark(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const findBookmark = await Bookmark.findByPk(id, { include: [Movie] });
      if (!findBookmark) throw { name: "Not found" };
      if (findBookmark.status === status) throw { name: "Status is already like that" };

      await Bookmark.update(
        { status },
        {
          where: { id },
        }
      );

      res
        .status(200)
        .json({
          message: `${findBookmark.Movie.title} has been update from ${findBookmark.status} to ${status}`,
        });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

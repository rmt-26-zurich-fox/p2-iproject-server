const { Bookmark, Movie } = require("../models");

async function authorization(req, res, next) {
  try {
    const UserId = req.user.id;
    const BookmarkId = req.params.id;

    const findBookmark = await Bookmark.findByPk(BookmarkId, {
      include: [Movie],
    });
    if (!findBookmark) throw { name: "Not found" };
    if (findBookmark.UserId != UserId) throw { name: "Forbidden" };

    req.bookmark = findBookmark;

    next();
  } catch (error) {
    next(error);
  }
}

module.exports = authorization;

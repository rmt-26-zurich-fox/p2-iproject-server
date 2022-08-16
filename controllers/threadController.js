const { Thread } = require("../models");
const router = require("../routes");

class ThreadController {
  static async createThread(req, res, next) {
    try {
      const { title, description, explicit, ProfileId, closed, CategoryId } =
        req.body;
      const { profileId } = req.user;
      const createdThread = await Thread.create({
        title,
        description,
        explicit,
        ProfileId: profileId,
        closed: false,
        CategoryId,
      });
      res
        .status(201)
        .json({ message: `Created new thread with ID ${createdThread.id}` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ThreadController;

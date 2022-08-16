const { Thread } = require("../models");
const router = require("../routes");

class ThreadController {
  static async createThread(req, res, next) {
    try {
      const { title, description, explicit, CategoryId } = req.body;
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
  static async editThread(req, res, next) {
    try {
      const { threadId } = req.params;
      const { title, description, explicit, closed, CategoryId } = req.body;
      const editedThread = await Thread.update(
        {
          title,
          description,
          explicit,
          closed,
          CategoryId,
        },
        {
          where: {
            id: threadId,
          },
        }
      );
      res.status(200).json({ message: `Edited thread` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ThreadController;

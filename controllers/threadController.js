const { Thread, Comment, ProfileComment } = require("../models");
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
  static async deleteThread(req, res, next) {
    try {
      const { threadId } = req.params;
      const deletedThread = await Thread.destroy({
        where: { id: threadId },
      });
      res.status(200).json({ message: `Deleted thread` });
    } catch (error) {
      next(error);
    }
  }

  static async getThreadList(req, res, next) {
    try {
      let option = {};
      const { underAge } = req.user;
      if (underAge === true) {
        option.where = {
          explicit: false,
        };
      }
      let threadList = await Thread.findAll(option);
      threadList.forEach((el) => {
        delete el.dataValues.createdAt;
        delete el.dataValues.updatedAt;
      });
      res.status(200).json(threadList);
    } catch (error) {
      next(error);
    }
  }
  static async findOneThread(req, res, next) {
    try {
      const { threadId } = req.params;
      const targetThread = await Thread.findOne({
        where: {
          id: threadId,
        },
        include: {
          model: Comment,
        },
      });
      res.status(200).json(targetThread);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ThreadController;

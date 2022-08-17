const { ThreadTitle, ThreadReply, User } = require("../models");

class ForumController {
  static async createThread(req, res, next) {
    const { id } = req.user;
    const { title, content } = req.body;
    try {
      await ThreadTitle.create({ title, content, UserId: id });
      res.status(201).json({ message: "Thread posted" });
    } catch (error) {
      next(error);
    }
  }

  static async getThreadTitle(req, res, next) {
    try {
      const thread = await ThreadTitle.findAll({
        include: {
          model: User,
          attributes: ["id", "userName", "email", "imageUrl"],
        },
      });
      res.status(201).json(thread);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getThreadTitleById(req, res, next) {
    const { threadId } = req.params;
    try {
      const thread = await ThreadTitle.findByPk(+threadId, {
        include: {
          model: User,
          attributes: ["id", "userName", "email", "imageUrl"],
        },
      });
      res.status(201).json(thread);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async createReply(req, res, next) {
    const { id } = req.user;
    const { content, ThreadId } = req.body;
    try {
      await ThreadReply.create({
        content,
        UserId: id,
        ThreadTitleId: ThreadId,
      });
      res.status(201).json({ message: "Reply posted" });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  static async getReply(req, res, next) {
    const { threadId } = req.params;
    try {
      const thread = await ThreadReply.findAll({
        order: [["createdAt", "ASC"]],
        where: {
          ThreadTitleId: threadId,
        },
        include: {
          model: User,
          attributes: ["id", "userName", "email", "imageUrl"],
        },
      });
      res.status(201).json(thread);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = ForumController;

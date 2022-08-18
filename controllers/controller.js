const { News, history } = require("../models");
// const history = require("../models/history");

class Controller {
  static async create(req, res, next) {
    try {
      const { title, content, imageUrl, categoryId } = req.body;
      // const input = { title, content, imageUrl, authorId, categoryId }
      let news = await News.create({
        title,
        content,
        imageUrl,
        authorId: req.user.id,
        categoryId,
        status: "active",
      });
      let dataHistory = await history.create({
        entityId: news.id,
        title: news.title,
        description: `new entity with id ${news.id} created`,
        updatedBy: news.authorId,
      });
      res.status(201).json({
        message: `new entity with id ${news.id} created`,
        news,
        dataHistory,
      });
    } catch (error) {
      next(error);
    }
  }

  static async read(req, res, next) {
    try {
      let news = await News.findAll();
      res.status(200).json({
        message: "Success read news",
        news,
      });
    } catch (error) {
      next(error);
    }
  }

  static async readById(req, res, next) {
    try {
      let id = +req.params.id;
      let news = await News.findAll({
        where: {
          authorId: id,
          // id: id,
        },
      });

      if (!news) {
        throw { name: "NotFound" };
      }
      res.status(200).json({
        message: "Success read news" + id,
        news,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePut(req, res, next) {
    try {
      let id = +req.params.id;
      const { title, content, imageUrl, categoryId } = req.body;
      let news = await News.findByPk(id);
      if (!news) {
        throw { name: "NotFound" };
      }
      let dataHistory = await history.create({
        entityId: news.id,
        title: news.title,
        description: `“entity with ${news.id} updated”`,
        updatedBy: news.authorId,
      });
      let updatedNews = await News.update(
        {
          title,
          content,
          imageUrl,
          categoryId,
        },
        {
          where: {
            id: id,
          },
        }
      );
      res.status(200).json({
        message: "Success update news" + " " + id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updatePatch(req, res, next) {
    try {
      let id = +req.params.id;
      const { status } = req.body;
      let news = await News.findByPk(id);
      if (!news) {
        throw { name: "NotFound" };
      }
      let updatedNews = await News.update(
        {
          status,
        },
        {
          where: {
            id: id,
          },
        }
      );
      let dataHistory = await history.create({
        entityId: news.id,
        title: news.title,
        description: `“entity with ${news.id} status has beed updated from ${news.status} to ${updatedNews.status}”`,
        updatedBy: news.authorId,
      });
      res.status(200).json({
        message: "Success update news" + " " + id,
      });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    try {
      let id = +req.params.id;
      let news = await News.destroy({
        where: {
          id: id,
        },
      });

      if (!news) {
        throw { name: "NotFound" };
      }
      res.status(200).json({
        message: "Success delete news" + id,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;

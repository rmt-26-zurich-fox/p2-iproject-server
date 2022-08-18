const Controller = require("../controllers/controller");
const router = require("express").Router();
const { News } = require("../models");

router.get("/", Controller.read);
router.post("/create", Controller.create);

async function authorization(req, res, next) {
  try {
    let news = await News.findByPk(req.params.id);
    const userLogged = req.user;
    if (!news) {
      throw { name: "News not Found" };
    }
    if (userLogged.role == "Admin") {
      next();
    } else if (userLogged.id !== news.authorId) {
      throw { name: "Forbidden" };
    } else {
      next();
    }
  } catch (error) {
    next(error);
  }
}
router.patch("/updateStatus/:id", authorization, Controller.updatePatch);
router.put("/updateAll/:id", authorization, Controller.updatePut);
router.get("/:id", Controller.readById);
router.delete("/:id", authorization, Controller.delete);
module.exports = router;

const router = require("express").Router();
const Controller = require("../controllers/bookmark");

router.post("/", Controller.addBookmark);
router.get("/", Controller.readBookmark);
router.patch("/:id", Controller.updateBookmark);
router.delete("/:id", Controller.deleteBookmark);

module.exports = router;

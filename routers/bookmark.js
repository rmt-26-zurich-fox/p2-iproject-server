const router = require("express").Router();
const Controller = require("../controllers/bookmark");

router.post("/", Controller.addBookmark);
router.patch("/:id", Controller.updateBookmark);
router.delete("/:id", Controller.deleteBookmark);

module.exports = router;

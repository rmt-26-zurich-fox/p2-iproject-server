const router = require("express").Router();
const ClothController = require("../controller/cloth-controller");
const authorization = require("../middlewares/authorization");

router.get("/", ClothController.showClothes);
router.post("/", authorization, ClothController.addCloth);
router.patch("/:id", authorization, ClothController.updateCloth);

module.exports = router;

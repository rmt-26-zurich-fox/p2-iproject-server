const router = require("express").Router();
const ClothController = require("../controller/cloth-controller");
const authorization = require("../middlewares/authorization");

router.get("/", ClothController.showClothes);
router.post("/", authorization, ClothController.addCloth);
router.get("/users", authorization, ClothController.getUser);
router.get("/package", authorization, ClothController.getPackage);
router.post("/payment", ClothController.midtransPayment);
router.patch("/:id", authorization, ClothController.updateCloth);

module.exports = router;

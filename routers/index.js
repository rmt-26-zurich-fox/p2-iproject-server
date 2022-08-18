const router = require("express").Router();
const user = require("./user");
const doctor = require("./doctor");
const Controller = require("../controllers/index");
const { authorizationUpdateProfile } = require("../middlewares/authorization");
const authentication = require("../middlewares/authentication");

router.use("/users", user);
router.use("/doctors", doctor);
router.get("/symptom", Controller.getSymptom);
router.get("/diseases", Controller.getDisease);

router.use(authentication);

router.get("/profiles", Controller.getProfile);
router.put(
  "/profiles/:id",
  authorizationUpdateProfile,
  Controller.updateProfile
);

router.get("/midtrans/payment", Controller.paymentMidtrans);
module.exports = router;

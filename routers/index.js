const router = require("express").Router();
const user = require("./user");
const doctor = require("./doctor");
const Controller = require("../controllers/index");

router.use("/users", user);
router.use("/doctors", doctor);

router.get("/profiles", Controller.getProfile);
router.put("/profiles/:id", Controller.updateProfile);
router.get("/diseases", Controller.getDisease);

module.exports = router;

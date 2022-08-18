const doctor = require("express").Router();
const DoctorController = require("../controllers/doctor");
const UserController = require("../controllers/user");
const authentication = require("../middlewares/authentication");

doctor.post("/doctorRegister", UserController.userRegister);
doctor.post(
  "/doctorSpecializations",
  DoctorController.addDoctorSpecializations
);

// doctor.post("/doctorLogin", UserController.userLogin);

doctor.get("/", DoctorController.getDoctor);
doctor.get("/favouriteDoctors", DoctorController.getFavourite);
doctor.use(authentication);

doctor.patch("/", DoctorController.statusDoctor);

doctor.patch(
  "/favouriteDoctors/:doctorId",
  DoctorController.addFavouriteDoctor
);

module.exports = doctor;

const doctor = require("express").Router();
const DoctorController = require("../controllers/doctor");

doctor.post("/doctorRegister", DoctorController.doctorRegister);
doctor.post(
  "/doctorSpecializations",
  DoctorController.addDoctorSpecializations
);
doctor.post("/doctorLogin", DoctorController.doctorLogin);

doctor.get("/doctors", DoctorController.getDoctor);
doctor.patch("/doctors", DoctorController.statusDoctor);
doctor.get("/favouriteDoctors", DoctorController.getFavourite);
doctor.post("/favouriteDoctors/:doctorId", DoctorController.addFavouriteDoctor);

module.exports = doctor;

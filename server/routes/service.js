const ServiceController = require("../controllers/serviceController");

const serviceRouter = require("express").Router();

serviceRouter.get("/", ServiceController.fetchAdminService);
serviceRouter.post("/add", ServiceController.addNewService);
serviceRouter.put("/", ServiceController.updateService);
serviceRouter.get("/:name/:serviceId", ServiceController.getOneService);

module.exports = serviceRouter;

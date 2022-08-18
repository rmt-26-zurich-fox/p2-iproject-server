const ServiceController = require("../controllers/serviceController");

const serviceRouter = require("express").Router();

serviceRouter.put("/", ServiceController.updateService);
serviceRouter.get("/", ServiceController.fetchAllServiceProvider);
serviceRouter.post("/add", ServiceController.addNewService);
serviceRouter.get("/:id", ServiceController.fetchServiceProvider);
serviceRouter.get("/:id/:serviceId", ServiceController.getOneService);

module.exports = serviceRouter;

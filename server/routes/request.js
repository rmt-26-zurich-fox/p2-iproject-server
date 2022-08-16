const serviceRouter = require("express").Router();
const RequestController = require("../controllers/requestController");

serviceRouter.get("/", RequestController.fetchAllRequest);
serviceRouter.post("/product/:productId", RequestController.addProduct);
serviceRouter.post("/service/:serviceId", RequestController.addService);

module.exports = serviceRouter;

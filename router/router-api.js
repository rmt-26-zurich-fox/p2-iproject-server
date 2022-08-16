const thirdApiRouter = require("express").Router();

thirdApiRouter.get("/payment");
thirdApiRouter.get("/recipe");
thirdApiRouter.get("/recipe/:recipeId");

module.exports = thirdApiRouter;

const thirdApiRouter = require("express").Router();
const ApiController = require("../controllers/api-controller");

thirdApiRouter.get("/payment");
thirdApiRouter.get("/recipes", ApiController.getRecipe);
thirdApiRouter.get("/recipes/:recipeId", ApiController.getRecipeById);

module.exports = thirdApiRouter;

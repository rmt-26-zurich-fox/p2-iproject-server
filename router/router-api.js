const thirdApiRouter = require("express").Router();
const ApiController = require("../controllers/api-controller");

thirdApiRouter.get("/payment");
thirdApiRouter.get("/recipe", ApiController.getRecipe);
thirdApiRouter.get("/recipe/:recipeId", ApiController.getRecipeById);

module.exports = thirdApiRouter;

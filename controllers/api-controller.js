const axios = require("axios");

class ApiController {
  static async getRecipe(req, res, next) {
    let { page, search } = req.query;
    // try {
    //   if (!page) {
    //     page = 1;
    //   }

    //   const size = 8;
    //   const offset = `${(page - 1) * size}`;

    //   const response = await axios({
    //     method: "GET",
    //     url: "https://tasty.p.rapidapi.com/recipes/list",
    //     params: { from: +offset, size, tags: "under_30_minutes", q: search },
    //     headers: {
    //       "X-RapidAPI-Key": process.env.TASTY_API_KEY,
    //       "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    //     },
    //   });

    //   let recipes = response.data.results.map((x) => {
    //     let ingredients = x.sections[0].components.map((y) => {
    //       return {
    //         id: y.id,
    //         ingredient: y.raw_text,
    //       };
    //     });
    //     return {
    //       id: x.id,
    //       name: x.name,
    //       description: x.description,
    //       nutrition: x.nutrition,
    //       instructions: x.instructions,
    //       image: x.thumbnail_url,
    //       ingredients,
    //     };
    //   });
    //   res.status(200).json(recipes);
    // } catch (error) {
    //   next(error);
    // }
  }

  static async getRecipeById(req, res, next) {
    const { recipeId } = req.params;
    // try {
    //   const response = await axios({
    //     method: "GET",
    //     url: "https://tasty.p.rapidapi.com/recipes/get-more-info",
    //     params: { id: recipeId },
    //     headers: {
    //       "X-RapidAPI-Key": process.env.TASTY_API_KEY,
    //       "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    //     },
    //   });

    //   let ingredients = response.data.sections[0].components.map((y) => {
    //     return {
    //       id: y.id,
    //       ingredient: y.raw_text,
    //     };
    //   });
    //   let recipe = {
    //     id: response.data.id,
    //     name: response.data.name,
    //     description: response.data.description,
    //     nutrition: response.data.nutrition,
    //     instructions: response.data.instructions,
    //     image: response.data.thumbnail_url,
    //     ingredients,
    //   };
    //   res.status(200).json(recipe);
    // } catch (error) {
    //   next(error);
    // }
  }
}

module.exports = ApiController;

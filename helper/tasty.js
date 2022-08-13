const axios = require("axios");

function recipe(search) {
  return axios({
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/list",
    params: { from: "0", size: "5", tags: "under_30_minutes", q: search },
    headers: {
      "X-RapidAPI-Key": process.env.TASTY_API_KEY,
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  });
}

module.exports = recipe;

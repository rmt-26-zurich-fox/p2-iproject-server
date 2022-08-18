const axios = require("axios");

function recipe(search, id) {
  return axios({
    method: "GET",
    url: "https://tasty.p.rapidapi.com/recipes/get-more-info",
    params: { id },
    headers: {
      "X-RapidAPI-Key": process.env.TASTY_API_KEY,
      "X-RapidAPI-Host": "tasty.p.rapidapi.com",
    },
  });
}

module.exports = recipe;

// "https://tasty.p.rapidapi.com/recipes/list"
// {from: '0', size: '20', tags: 'under_30_minutes', q: search},

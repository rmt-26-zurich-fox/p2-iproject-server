const express = require("express");
const app = express();
const port = 3000;
const axios = require("axios");
const { Strategy } = require("./models");

app.get("/", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=id-ID"
    );
    const nameAgents = data.data.map((e) => {
      return e.displayName, e.description;
    });
    console.log(nameAgents);
    // console.log(data.data[0].displayName);
  } catch (error) {
    console.log(error);
  }
});

app.get("/:map/:type/:site", async (req, res, next) => {
  try {
    let { map } = req.params;
    let { type } = req.params;
    let { site } = req.params;
    const strategies = await Strategy.findAll({ where: { map, type, site } });
    // console.log(strategies);
    res.status(200).json(strategies);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

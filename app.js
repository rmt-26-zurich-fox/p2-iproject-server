const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");
const { Strategy, User } = require("./models");
const cors = require("cors");
const jwt = require("jsonwebtoken");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/agents", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://valorant-api.com/v1/agents?isPlayableCharacter=true&language=id-ID"
    );
    const agents = data.data.map((e) => {
      return {
        name: e.displayName,
        description: e.description,
        icon: e.displayIcon,
        img: e.fullPortrait,
        role: {
          name: e.role.displayName,
          image: e.role.displayIcon,
        },
        abilities: {
          ability1: {
            name: e.abilities[0].displayName,
            description: e.abilities[0].description,
            imgAbility: e.abilities[0].displayIcon,
          },
          ability2: {
            name: e.abilities[1].displayName,
            description: e.abilities[1].description,
            imgAbility: e.abilities[1].displayIcon,
          },
          ability3: {
            name: e.abilities[2].displayName,
            description: e.abilities[2].description,
            imgAbility: e.abilities[2].displayIcon,
          },
          ultimate: {
            name: e.abilities[3].displayName,
            description: e.abilities[3].description,
            imgAbility: e.abilities[3].displayIcon,
          },
        },
      };
    });
    res.status(200).json(agents);
  } catch (error) {
    next(error);
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
    next(error);
  }
});

app.post("/github-sign-in", async (req, res, next) => {
  try {
    let { email } = req.body;
    const [user, created] = await User.findOrCreate({
      where: {
        username: email,
      },
      defaults: {
        username: email,
        password: "github-user",
      },
    });
    const access_token = jwt.sign("github-user", "rahasia");
    res.status(200).json({ access_token });
  } catch (error) {
    console.log(error);
  }
});

app.get("/map", async (req, res, next) => {
  try {
    const { data } = await axios.get(
      "https://ap.api.riotgames.com/val/content/v1/contents?locale=id-ID",
      {
        headers: {
          "X-Riot-Token": "RGAPI-95c5c310-288a-451b-9ac1-649df27f4060",
        },
      }
    );
    res.status(200).json(data.maps);
  } catch (error) {
    console.log(error);
  }
});

app.use((err, req, res, next) => {
  let code = 500;
  let msg = "Internal Server Error";

  res.status(code).json({ message: msg });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

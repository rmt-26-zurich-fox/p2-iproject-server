const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const axios = require("axios");
const { Strategy, User } = require("./models");
const cors = require("cors");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.post("/login", async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw { name: "Not Found" };
    }
    const isPasswordValid = compareHash(password, user.password);
    if (!isPasswordValid) {
      throw { name: "password invalid" };
    }
    const payload = {
      id: user.id,
    };
    const token = createToken(payload);
    res.status(200).json({
      access_token: token,
      id: user.id,
      role: user.role,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

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

app.get("/map", async (req, res, next) => {
  try {
    const url =
      "https://ap.api.riotgames.com/val/content/v1/contents?locale=id-ID";

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // Add Your Key Here!!!
    axios.defaults.headers.common = {
      "X-Riot-Token": "RGAPI-74ea5a79-c529-44dd-8fc4-a4fcd75b62e2",
    };

    const smsD = await axios({
      method: "post",
      url: url,
      data: {
        message: "Some message to a lonely_server",
      },
      config,
    });
    console.log(smsD);
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

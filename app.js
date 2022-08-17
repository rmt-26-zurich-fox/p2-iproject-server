if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middleware/error-handler");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

// API RAJAONGKIR, Kalo gamau bisa dikirim gausah pake

app.get("/province", async (req, res) => {
  try {
    const response = await axios({
      method: "get",
      url: "https://api.rajaongkir.com/starter/province",
      headers: {
        key: process.env.RAJAONGKIR_API,
      },
    });
    const province = response.data.rajaongkir.results;
    res.status(200).json(province);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.get("/city/:provinceId", async (req, res) => {
  const { provinceId } = req.params;
  try {
    let opt = {};
    if (+provinceId) {
      opt = { province: provinceId };
    }

    const response = await axios({
      method: "get",
      url: "https://api.rajaongkir.com/starter/city",
      params: opt, // <<< contoh pake query params
      headers: {
        key: process.env.RAJAONGKIR_API,
      },
    });

    const cities = response.data.rajaongkir.results
      .filter(
        (el) =>
          el.city_name === "Bogor" ||
          el.province === "DKI Jakarta" ||
          el.city_name === "Depok"
      )
      .filter((el) => el.city_name !== "Kepulauan Seribu");

    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.post("/cost", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: "https://api.rajaongkir.com/starter/cost",
      data: {
        origin: "79",
        destination: "153",
        weight: 2000,
        courier: "jne",
      }, // <<< contoh pake query params
      headers: {
        key: process.env.RAJAONGKIR_API,
      },
    });
    const cost = response.data;
    res.status(200).json(cost);
  } catch (error) {
    res.status(500).json({ error });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

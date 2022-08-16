if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const axios = require("axios");
const express = require("express");
const cors = require("cors");
const router = require("./router");
const midtransClient = require("midtrans-client");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

let parameter = {
  transaction_details: {
    order_id: `YOUR-ORDERID-${new Date().valueOf()}`,
    gross_amount: 10000,
  },
  credit_card: {
    secure: true,
  },
  item_details: [
    {
      id: "a01",
      price: 7000,
      quantity: 1,
      name: "Apple",
    },
    {
      id: "b02",
      price: 3000,
      quantity: 1,
      name: "Orange",
    },
  ],
  customer_details: {
    first_name: "gagarin",
    last_name: "pratama",
    email: "gagarin.pra@example.com",
    phone: "081398830217",
  },
};

// API MIDTRANS

app.get("/payment", async (req, res) => {
  let snap = new midtransClient.Snap({
    // Set to true if you want Production Environment (accept real transaction).
    isProduction: false,
    serverKey: process.env.MIDTRANS_KEY,
  });
  try {
    const transaction = await snap.createTransaction(parameter);
    // transaction token
    let transactionToken = transaction.token;
    res.status(200).json({ trans_token: transactionToken });
  } catch (error) {
    res.status(500).json({ error });
  }
});

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

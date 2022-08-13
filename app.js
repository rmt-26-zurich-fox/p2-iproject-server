if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const recipe = require("./helper/tasty");
const express = require("express");
const cors = require("cors");
const midtransClient = require("midtrans-client");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let parameter = {
  transaction_details: {
    order_id: `YOUR-ORDERID-${new Date().valueOf()}`,
    gross_amount: 10000,
  },
  credit_card: {
    secure: true,
  },
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

// API TASTY

app.get("/recipe", (req, res) => {
  const { search } = req.query;
  recipe(search)
    .then(function (response) {
      let recipes = response.data.results.map((x) => {
        let ingredients = x.sections[0].components.map((y) => {
          return {
            id: y.id,
            ingredient: y.raw_text,
          };
        });
        return {
          id: x.id,
          name: x.name,
          description: x.description,
          nutrition: x.nutrition,
          instructions: x.instructions,
          image: x.thumbnail_url,
          ingredients,
        };
      });
      res.send({ recipes });
    })
    .catch(function (error) {
      console.error(error);
    });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

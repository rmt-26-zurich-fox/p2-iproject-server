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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

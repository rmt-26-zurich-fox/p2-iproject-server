const cors = require("cors");
const express = require("express");
const router = require("./routes");
const app = express();

app.use(cors({origin: 'https://otohelper1.web.app'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

module.exports = app;

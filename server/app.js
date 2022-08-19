const cors = require("cors");
const express = require("express");
const allowAccess = require("./middleware/access");
const router = require("./routes");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(allowAccess)
app.use(router);

module.exports = app;

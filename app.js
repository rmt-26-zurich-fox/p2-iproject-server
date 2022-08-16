//* init express
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

//* init body parse + json + cors
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//* init middlewares & routes
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

//! for testing
const { Patchnote } = require("./models");
const { Op } = require("sequelize");
const sequelize = require("sequelize");

//* init use for routes & error handler
app.use(routes);
app.use(errorHandler);

//* listen
app.listen(port, () => {
	console.log("alive and kickin' at", port);
});

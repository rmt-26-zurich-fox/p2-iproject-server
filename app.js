if (process.env.NODE_ENV != "production" ) {
    require('dotenv').config(); // Development
}

// import cors
const cors = require("cors");

// Require Package & Variables
const express = require("express");
const app = express();
const router = require("./routes");

// Change port before deploy
const port = process.env.PORT || 3000;

// Middleware req.body
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(router);

// Middleware Error Handler
app.use(errorHandler);

// Listen
app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

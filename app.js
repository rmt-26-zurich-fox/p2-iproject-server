if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
}

const cors = require("cors");
const express = require('express');
const app = express();
const router = require('./routers/index.js');
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
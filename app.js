if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require("./router/index");
const cors = require("cors");
const multer = require("multer");
const errorHandler = require('./middlewares/errorHandler');



app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });





app.use(router);


app.use(errorHandler);



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
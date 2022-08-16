
const cors = require("cors");
const express = require("express");
const app = express();
const router = require("./routes");
const errorHandler = require("./middlewares/errorHandler");
const port = 3000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})

if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const router = require("./routers");
const errorHandlers = require("./middlewares/errorHandlers");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errorHandlers);



app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});





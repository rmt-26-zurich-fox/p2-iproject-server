if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
// const errorhandler = require("./middlewares/errorHandler");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers/router");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
// app.use(errorhandler);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

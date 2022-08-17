
const express = require("express");
const app = express();
const port = 3000;
const router = require("./routers");
const errorHandlers = require("./middlewares/errorHandlers");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);
app.use(errorHandlers);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


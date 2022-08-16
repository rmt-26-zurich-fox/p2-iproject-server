const cors = require("cors");
const express = require("express");
const app = express();
const port = 3000;
const routerindex = require("./routes/index");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(routerindex);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});

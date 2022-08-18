if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const cors = require("cors");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers/router");
require('./strategies/discord')
const session = require('express-session')
const passport = require('passport')

app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'nosecrethere' 
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", router);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

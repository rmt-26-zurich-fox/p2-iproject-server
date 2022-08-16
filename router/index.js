const Register = require("../controller/register");

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const router = require("express").Router();

router.post("/register", Register.postRegister);





module.exports = router;
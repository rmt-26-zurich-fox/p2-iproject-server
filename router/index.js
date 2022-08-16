const Login = require("../controller/login");
const Register = require("../controller/register");

if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}
const router = require("express").Router();

router.post("/register", Register.postRegister);
router.post("/login"), Login.postLogin;





module.exports = router;
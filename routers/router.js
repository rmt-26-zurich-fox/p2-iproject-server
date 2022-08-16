const router = require("express").Router()
const { auth } = require("../middlewares/authentication")
const user = require("./user")

router.use("/user", user)
router.use(auth)

module.exports = router
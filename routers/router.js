const router = require("express").Router()
const { auth } = require("../middlewares/authentication")
const user = require("./user")
const anime = require("./anime")
const art = require("./art")


router.use("/user", user)
router.use("/anime", anime)
router.use("/art", art)
router.use(auth)

module.exports = router
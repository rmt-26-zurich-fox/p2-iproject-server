const router = require("express").Router()
const { auth } = require("../middlewares/authentication")
const user = require("./user")
const anime = require("./anime")
const art = require("./art")
const comment = require("./comment")
const planning = require("./planning")



router.use("/user", user)
router.use("/animes", anime)
router.use("/comments", comment)

router.use(auth)

router.use("/arts", art)
router.use("/plannings", planning)


module.exports = router
if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
const {User} = require("../models")
const userController = require("../controllers/userController")
const router = require("express").Router()
const {OAuth2Client} = require('google-auth-library')
const { createToken } = require("../helpers/jwt")

// router.get("/", userController.showUser)
router.post("/register", userController.register)
router.post("/login", userController.login)
// router.post("/google-sign-in", async (req,res) => {
//     console.log("sampai tujuan");
//     try{
//         console.log(req.headers, "<<< THIS IS HEADERS");
//         const {google_token} = req.headers
//         const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
//         const ticket = await client.verifyIdToken({
//             idToken: google_token,
//             audience: process.env.GOOGLE_CLIENT_ID, 
//         });
//         const payload = ticket.getPayload();
//         console.log(payload, "<<<<PAYLOAD");
//         const [user, created] = await User.findOrCreate({
//             where: {
//                 email: payload.email
//             },
//             defaults: {
//                 username: payload.name,
//                 email: payload.email,
//                 password: "ini_dari_google",
//                 role: "staff",
//                 phoneNumber: null,
//                 address: null
//             },
//             hooks: false,

//         })
//         const access_token = createToken({
//             id: user.id
//         })
//         res.status(200).json({access_token})
//         console.log(user, "<<< user");
//         console.log(created, "<<< created");
//     }catch(err){
//         console.log(err)
//         res.status(500).json({message: "internal server error"})
//     }
// })

module.exports = router
const express = require("express");
const passport = require("passport");
const productController = require("../controllers/productController");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");
const axios = require("axios");
const queryString = require("querystring");


// async function exchangeCode(code){
//     console.log(code);
//     try {
//         const oauth = await axios.post('https://discord.com/api/oauth2/token', queryString.stringify(

//             {
//                 'client_id' : process.env.DISCORD_CLIENT_ID,
//                 'client_secret' : process.env.DISCORD_CLIENT_SECRET,
//                 'grant_type': "authorization_code",
//                 'code' : code,
//                 'redirect_uri': process.env.DISCORD_CLIENT_REDIRECT
//             }),
//             {
//             'Content-Type': 'application/x-www-form-urlencoded'
//            }
//        )
//        console.log(oauth);
//         return oauth
//     } catch (error) {
//         console.log(error);
//     }

// }

const router = express.Router();

router.post("/admin/register", userController.adminRegister);
router.post("/admin/login", userController.adminLogin);
router.post("/cust/register", userController.registerCustomer);
router.post("/cust/login", userController.loginCustomer);
router.post("/cust/googleSignIn", userController.googleLoginCustomer);

router.get("/api/auth/discord/", passport.authenticate("discord"));
router.get("/api/auth/discord/redirect", 
// passport.authenticate("discord"),
 async (req, res) => {
  try {
    let { code } = req.query;
    const oauth = await axios.post(
      "https://discord.com/api/oauth2/token",
      queryString.stringify({
        client_id: process.env.DISCORD_CLIENT_ID,
        client_secret: process.env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.DISCORD_CLIENT_REDIRECT,
      }),
      {
        "Content-Type": "application/x-www-form-urlencoded",
      }
    );
    const {access_token} = oauth.data
    // res.redirect(201).json(access_token);
    // res.redirect(201, 'http://localhost:8080' + queryString.stringify(access_token))
    res.redirect(`https://the-south-face.web.app?token=${access_token}&source=discord`)
  } catch (error) {
    console.log(error);
  }
});

router.get('/discordNyusahin', userController.getDiscordEmail)

router.get("/products", productController.getProducts);
router.get("/products/:productId", productController.getOneProduct);

router.use(authentication);

router.post("/products/add", authorization, productController.createProduct);
router.get("/cart", productController.getCart);
router.delete("/cart", productController.emptyCart);
router.get("/cart/total", productController.getTotalPrice);
router.delete(
  "/products/:productId/delete",
  authorization,
  productController.deleteProduct
);
router.post("/cart/:productId", productController.addtoCart);
router.delete("/cart/:cartId", productController.deleteItemFromCart);

module.exports = router;

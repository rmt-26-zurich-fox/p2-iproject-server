const{User}= require('../models');
const {OAuth2Client} = require('google-auth-library');
const { createToken } = require('../helpers/jwtHelper');

const oAuth= async(req,res,next)=>{
    try {
    const{token_google}=req.headers
//    console.log(token_google);
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: token_google,
      audience: process.env.GOOGLE_CLIENT_ID,  
  });
  const payload = ticket.getPayload();
  const [user,created]= await User.findOrCreate({
    where:{
        email: payload.email},
        defaults:{
            username:payload.name,
            email: payload.email,
            password: "ini_dari_google",
            phoneNumber: '14045'
        },
        hooks:false
    })
    if(!user){
        throw({name:"Email or Password invalid"})
    }
    // console.log(user,"INI USER")
    // console.log(created,"INI CREATED")
    const access_token=createToken({
        id: user.id
    })
    res.status(200).json({access_token, name: user.username})
    } catch (error) {
        next(error)
    }
}


module.exports={oAuth}



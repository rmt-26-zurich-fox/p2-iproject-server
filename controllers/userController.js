const {User}= require('../models');
const {comparePassword} = require('../helpers/bcryptHelper');
const {createToken}= require('../helpers/jwtHelper');
const {OAuth2Client} = require('google-auth-library');

class Controller{
    static async register(req, res,next) {
        try {
          const { username, email, password, phoneNumber } =req.body;
        let data=await User.create({username,email,password,phoneNumber});
          res.status(201).json({
            message: "user registered",
            user:
            {id: data.id,
            email: data.email}
          });
        } catch (error) {
          next(error)
        }
      }

    static async login(req, res,next) {
        try {
            const{username,password}=req.body
            // console.log(req.body)
            if(!username || !password ){
              throw ({name:'Username or Password invalid'})
    
            }
            
            let data= await User.findOne({where:{username:username}})
            let checkPassword= comparePassword(password,data.password)
          // console.log(checkPassword);
    
            if(!data){
              throw ({name:'Username or Password invalid'})
            }
            if(!checkPassword){
                throw ({name:'Username or Password invalid'})
            }
    
              let payLoad= {
                id: data.id
              }
              let token= createToken(payLoad)
                res.status(200).json({
                   id:data.id,
                   access_token: token,
                   name: data.username,
                   role: data.role
                })
    
        } catch (error) {
               next(error)
        }
      }

      static async googleLogin(req,res,next){
        try {
            const{token_google}=req.headers
           
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
                },
                hooks:false
            })
            if(!user){
                throw({name:"Username or Password invalid"})
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
}


module.exports= Controller
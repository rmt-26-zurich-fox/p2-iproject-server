const {User}= require('../models');
const {comparePassword} = require('../helpers/bcryptHelper');
const {createToken}= require('../helpers/jwtHelper');
const emailVerifier = require("verifier-node");

class Controller{
    static async register(req, res,next) {
        try {
          const { username, email, password, phoneNumber } =req.body;
          let response= await emailVerifier.verify(email,'2b1e810090b21cab8a8753ec6bd1f0919ec90be6ea14ac5d381116f8700ea13cbc8dba7ff7e392b826068e5d306a7d80')
          console.log(response);
          if(response.field("status")=== true){
            let data=await User.create({username,email,password,phoneNumber});
            res.status(201).json({
              message: "user registered",
              user:
              {id: data.id,
              email: data.email}
            });
          }else{
            throw({name: response.data.error.message})
          }
            // console.log(response.field("status"))
        
        } catch (error) {
          next(error)
        }
      }

    static async login(req, res,next) {
        try {
            const{email,password}=req.body
            // console.log(req.body)
            if(!email || !password ){
              throw ({name:'Username or Password invalid'})
    
            }
            
            let data= await User.findOne({where:{email:email}})
            let checkPassword= comparePassword(password,data.password)
          // console.log(checkPassword);
    
            if(!data){
              throw ({name:'Email or Password invalid'})
            }
            if(!checkPassword){
                throw ({name:'Email or Password invalid'})
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

      
}


module.exports= Controller
const {User}= require('../models');
const {comparePassword} = require('../helpers/bcryptHelper');
const {createToken}= require('../helpers/jwtHelper');

class Controller{

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

}


module.exports= Controller
const { verifyToken } = require("../helpers/jwtHelper")
const {User}=require('../models');

const Authentication= async(req,res,next)=>{
    try {
      const {access_token}=req.headers
        if(!access_token){
            throw ({name: 'No Token'})
        }

        let payLoad= verifyToken(access_token)
        let user= await User.findByPk(payLoad.id)

        if(!user){
            throw({name: 'Unauthorized'})
        }

        req.user={
            id: user.id,
            name: user.username,
            email: user.email,
            phoneNumber: user.phoneNumber
        }
       next()
    } catch (error) {
       next(error)
        
    }
}

module.exports= {Authentication}
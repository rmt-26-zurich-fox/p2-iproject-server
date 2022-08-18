const { User } = require('../models')
const {compareHash} = require('../helpers/bcrypt');
const { createToken } = require('../helpers/jwt');
const axios = require("axios")
class userController {

    static async showUser(req, res, next) {
        try {
            let users = await User.findAll()
            res.status(200).json({
                message: "successfully shown users", 
                users
            })
        } catch(error) {
            next(error)
        }
    }
    
    static async register(req, res, next) {
        console.log("ini di controller");
        try{
            const {email, password} = req.body
            const createUser = await User.create({
           
                email,
                password,

            })

            res.status(201).json({message: `username with email ${createUser.email} has been created`}) // berhasil
        }catch(error){
            // next(error) // error!
            if ( error.name == "SequelizeUniqueConstraintError" || error.name == "SequelizeValidationError"){
            res.status(400).json({
                message: error.errors[0].message
            })
        }else {
            console.log(error);
            res.status(500).json({message: "Internal server error"})
        }
        }
    }

    static async login(req,res,next){
        try{ console.log("haii");
            const {email, password} = req.body
            console.log(req.body);
            const findUser = await User.findOne({
                where: {
                    email
                }
            })
            if(!findUser){
                throw ({name: "invalid_email/password"})
            } 

            const comparePassword = compareHash(password, findUser.password)
            console.log(comparePassword);
            if(!comparePassword){
                throw ({name: "invalid_email/password"})
            }

            const payload = {
                id: findUser.id
            }
            
            const access_token = createToken(payload)

            res.status(200).json({access_token: access_token})
        } catch(error){
            // next(error)
            if (error.name == "invalid_email/password") {
                res.status(401).json({message: "user not found"})

            } else {
                res.status(500).json({message: "internal server error"})
            }
        }
        }
    
  
}

module.exports = userController
const { hashSync, compareSync } = require("bcryptjs")
const { sign, verify} = require('jsonwebtoken')
const { User, Product} = require('../models')

class Controller{
    static async register(req, res, next){
        try {
            let { username, email, password, phoneNumber, address} = req.body
            const user = await User.create({ username, email, password: password, phoneNumber, address})
            console.log(user.dataValues)
                let payload = {
                    id: user.id,
                }
                const token = sign(payload,  process.env.SECRET_KEY, {
                    expiresIn:'5h'
                })
            
            res.status(201).json({
                id: user.id,
                email: user.email,
                access_token: token,
                message: "Thank You For Joining Us!"
            })

        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async login(req,res,next){
        try {
            const { username , password } = req.body

            if(!username){
                throw({message: "Invalid username/password"})
            }else{
                const user = await User.findOne({where:{username:username}})
                if(!user){
                    throw({message: "Invalid username/password"})
                }else {
                    let verifyPass = compareSync(password , user.password)
                    if(!verifyPass){
                    throw({message: "Invalid username/password"})
                    }else{
                        let token = sign({id : user.id}, process.env.SECRET_KEY)
                        res.status(200).json({
                            access_token: token
                        })
                    }
                }
            }
        } catch (err) {
            next(err)
        }
    }

   static async fetchProduct(req, res, next){
        try {
            const { search , page , size} = req.query

            let {options, currentPage} = Product.filterProduct(search, page , size)
            const products = await Product.findAndCountAll(options)

            res.status(200).json({totalPages: Math.ceil(products.count/ options.limit), products, currentPage})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
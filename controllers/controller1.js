const { hashSync, compareSync } = require("bcryptjs")
const { sign, verify} = require('jsonwebtoken')
const { User, Product, ShoppingCart} = require('../models')
const {Op} = require('sequelize')

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

    static async googleLogin(req,res,next){
        try {
            const {access_token} = req.headers

            const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

            const ticket = await client.verifyIdToken({
            idToken: access_token,
            audience: process.env.GOOGLE_CLIENT_ID,  
            });
            const payload = ticket.getPayload();
            console.log(payload)
            const [found , created] = await User.findOrCreate({where:{
                email: payload.email
            },
                defaults:{
                    username: payload.name, 
                    email: payload.email, 
                    password:"account gmail", 
                },
                hooks:false
            })

            let token = sign({id : found.id}, process.env.SECRET_KEY)

            
                res.status(200).json({
                    id: found.id,
                    access_token: token
                })
            

        } catch (err) {
            console.log(err)
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

    static async productDetail(req, res, next){
        try {
            const { id } = req.params

            const product = await Product.findOne({where:{id: id}})

            if(!product){
                throw({message: "Product isn't Found"})
            }

            res.status(200).json(product)
        } catch (err) {
            next(err)
        }
    }

    static async shoppingCart(req, res, next){
        try {
            const cart = await ShoppingCart.findAll({where:{UserId: req.user.id}, include:[
                {
                    model: Product,
                }
            ],
            order:[['createdAt', 'DESC']]})

            res.status(200).json(cart)
        } catch (err) {
            next(err)
        }
    }

   static async createShoppingCart(req, res, next){
    try {
        const { productId } = req.params
        const { quantity } = req.body

        const product = await Product.findOne({where: {id: productId}})
        if(!product){
            throw({message: "Product isn't Found"})
        }
        const prodInCart = await ShoppingCart.findOne({
            where:{
                [Op.and]: [
                    {UserId: req.user.id},
                    {ProductId: product.id}
                ]
            }
        })

        if(prodInCart){
            throw({message: "You've already added this Product to yout shopping cart"})
        }
        const cart = await ShoppingCart.create({UserId: req.user.id, ProductId: productId , quantity: quantity})

        res.status(201).json({message: "Product is added to your Shopping Cart"})

    } catch (err) {
        next(err)
    }
   }

}

module.exports = Controller
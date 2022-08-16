const axios = require('axios')
const { User, Post, Category} = require('../models')

module.exports = class QuoteController {

    static async allProgrammerQuote (req, res, next){

        try {

            const { data } = await axios({
                method: 'get',
                url: 'https://programming-quotes-api.herokuapp.com/Quotes?count=10',
            })
            
            console.log(data)
            res.status(200).json(data)
        } catch (error) {

            console.log(error)
            next(error)
            
        }

    }

    static async allAnimeQuote(req, res, next){

        try {

            const { data } = await axios({
                method: 'get',
                url: 'https://animechan.vercel.app/api/quotes'
            })

            res.status(200).json(data)
            
        } catch (error) {

            console.log(error)
            next(error)
            
        }
    } 


    static async allQuotes(req, res, next){

        try {

            const quote = await Post.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Category,
                        attributes: ['id', 'name']
                    }
                ]
            })

            res.status(200).json(quote)
            
        } catch (error) {

            console.log(error)
            next(error)
            
        }
    }

    static async createQuote(req, res, next){

        const { desc, CategoryId } = req.body

        const UserId = req.user.id

        try {

            const quote = await Post.create({desc, UserId, CategoryId})

            res.status(201).json(quote)
            
        } catch (error) {
            
            console.log(error)
            next(error)
        }
    }

    
}
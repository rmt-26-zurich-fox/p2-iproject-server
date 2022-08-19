const axios = require('axios')
const { getPagination, getPagingData } = require('../helpers/pagination')
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

        const { page, size } = req.query

        try {

            const { limit, offset } = getPagination(page, size)

            const data = await Post.findAndCountAll({
                include: [
                    {
                        model: User,
                        attributes: ['username']
                    },
                    {
                        model: Category,
                        attributes: ['id', 'name']
                    }
                ],
                limit, offset
            })

            const quote = getPagingData(data, page, limit)

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

    static async quoteOfTheDay(req, res, next){

        try {

            const { data } = await axios({
                method: 'get',
                url: 'https://favqs.com/api/qotd',
            })

            res.status(200).json(data)
            
        } catch (error) {

            console.log(error)
            next(error)
            
        }

    }

    static async getWord(req, res, next){

        const { word } = req.query

        try {

            const { data } = await axios({
                method: 'get',
                url: 'https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/' + word,
                headers: {
                    "app_id": '2387683c',
                    "app_key": '567a0b3a665800cb11758724e2c5bc23'
                }
            })

            console.log(data)
            res.status(200).json(data)
            
        } catch (error) {

            console.log(error)
            next(error)
            
        }

        
    }

   
    
}
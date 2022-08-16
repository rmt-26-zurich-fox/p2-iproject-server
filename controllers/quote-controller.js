const axios = require('axios')
const { User, Post} = require('../models')

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
            res.status(500).json({
                message: 'Server Internal Error'
            })
            
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
            res.status(500).json({
                message: 'Server Internal Error'
            })
            
        }
    } 
}
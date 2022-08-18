
const { User, Product, ShoppingCart} = require('../models')
const axios = require('axios')

class Controller{

    static async deleteCart(req,res,next){
        try {
            const { id } = req.params
            const cart = await ShoppingCart.destroy({where: {id: id}})
            res.status(200).json({message: "Product is deleted from your shopping cart"})
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
    static async fetchCostRajaOngkir(req,res,next){
        try {
            const { destination, courier } = req.body
            const { key } = req.headers
            if(!destination || ! courier){
                throw({message: "destination and courier is required"})
            }
            const {response, data} = await axios({
                url: `https://api.rajaongkir.com/starter/cost`,
                method: "POST",
                headers: {key: '5373927fc647a7dcee584da18247a14a', 'content-type': 'application/x-www-form-urlencoded'},
                data: `origin=151&destination=${destination}&weight=1700&courier=${courier}`

            })
            console.log(data)
            res.status(200).json(data.rajaongkir)
        } catch (err) {
            next(err)
        }
    }
    static async fetchCityRajaOngkir(req,res,next){
        try {
            
            const {data} = await axios({
                url:"https://api.rajaongkir.com/starter/city?province=6",
                method: "GET",
                headers: {key: "5373927fc647a7dcee584da18247a14a"},
            })

            res.status(200).json(data.rajaongkir)
        } catch (err) {
            next(err)
        }
    }
}


module.exports = Controller
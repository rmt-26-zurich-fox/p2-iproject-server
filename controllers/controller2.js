
const { User, Product, ShoppingCart} = require('../models')


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
}


module.exports = Controller
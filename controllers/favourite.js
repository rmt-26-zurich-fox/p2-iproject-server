const { User, Food, Favourite } = require('../models')

class Controller {
    static async postFav(req, res, next) {
        try {
            const { foodId } = req.params
            const { id } = req.currentUser
            let reg = new RegExp('^[0-9]*$');
            if (reg.test(foodId) == false || foodId <= 0) throw `notFound`
            const food = await Food.findByPk(foodId)
            if (!food) throw `notFound`
            const [favourite, created] = await Favourite.findOrCreate({
                where: { userId: id, foodId: foodId },
                defaults: { userId: id, foodId: foodId }
            })
            if (!created) throw { name: "duplicate_wishlist" }
            res.status(201).json({ message: 'Craving added' })
        } catch (error) {
            next(error)
        }
    }
    static async getFav(req, res, next) {
        try {
            // 200
            let fav = await Favourite.findAll({ where: { userId: req.currentUser.id }, include: [Food] })
            res.status(200).json(fav)
        } catch (error) {
            // 500
            next(error)
        }
    }
}

module.exports = Controller
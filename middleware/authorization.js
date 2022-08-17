const { User, Food, Favourite } = require('../models')

const favouriteAuth = async (req, res, next) => {
    try {
        const fav = await Favourite.findOne({ where: { userId: req.currentUser.id } })
        if (!fav) throw { name: "forbidden" }
        else next()
    } catch (error) {
        if (error.name === "forbidden") res.status(403).json({ message: "You are not authorized" })
        else res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { favouriteAuth }
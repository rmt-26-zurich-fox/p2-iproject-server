const router = require('express').Router()
const locationController = require('../controller/locationController')
const userController = require('../controller/userController')
const favoriteController = require('../controller/favoriteController')
const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

router.get('/location', locationController.getLocation)

router.get('/location/:id', locationController.getLocationById)

router.post('/register', userController.register)

router.post('/login', userController.login)

router.use(async (req, res, next) => {
    try {
        let { access_token } = req.headers
        if (!access_token) {
            throw { name: "noToken" }
        }
        let payload = verifyToken(access_token)
        let user = await User.findOne({
            where: {
                id: payload.id
            }
        })
        if (!user) {
            throw { name: "Unautorized" }
        }
        req.user = { userId: user.id, email: user.email }
        next()
    } catch (err) {
        next(err)
    }
})

router.post('/favourite/:id', favoriteController.createFavourite)

router.get('/favourite', favoriteController.getFavourite)

router.delete('/favourite', favoriteController.deleteFavourite)



module.exports = router
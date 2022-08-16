const favoriteRouter = require('express').Router()
const FavoriteController = require('../controllers/favorite-controller')

favoriteRouter.get('/', FavoriteController.allFavorite)
favoriteRouter.post('/:PostId', FavoriteController.createFavorite)

module.exports = favoriteRouter
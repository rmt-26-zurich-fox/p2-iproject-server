const { Favorite, User, Post } = require('../models')

module.exports = class FavoriteController{

    static async allFavorite(req, res, next){

        try {

            const favorite = await Favorite.findAll({
                include: [
                    {
                        model: User,
                        attributes: ['id', 'username', 'email', 'role']
                    },
                    {
                        model: Post,
                        exclude: ['createdAt', 'updatedAt']
                    }
                ]
            })

            res.status(200).json(favorite)
            
        } catch (error) {
            
            console.log(error)
            next(error)
        }

    }

    static async createFavorite(req, res, next){

        const { PostId } = req.params

        const UserId = req.user.id

        try {

            const findQuote = await Post.findByPk(PostId)

            if(!findQuote) throw {name: 'Not Found'}

            const favorite = await Favorite.create({PostId:findQuote.id, UserId})

            res.status(201).json(favorite)
            
        } catch (error) {

            console.log(error)
            next(error)
        }
    }
}
const { User, Favorite } = require('../models')
const { Op } = require('sequelize')
const axios = require('axios')

class Controller {
    static async createFavourite(req, res, next) {
        try {
            const { userId } = req.user
            const { id } = req.params
            const { data } = await axios({
                method: 'get',
                url: `https://dev.farizdotid.com/api/purwakarta/wisata/${id}`
            })

            const cekDuplicate = await Favorite.findOne({
                where: {
                    userId,
                    locationId: id
                }
            })
            if (cekDuplicate) {
                throw { name: 'duplicat' }
            }
            const { nama, gambar_url, kategori, deskripsi, latitude, longitude } = data
            const favourite = await Favorite.create({ name: nama, gambarUrl: gambar_url, kategori, latitude, longitude, userId, locationId: data.id })
            res.status(201).json({ favourite })
        } catch (error) {
            next(error)
        }
    }

    static async getFavourite(req, res, next) {
        try {
            const { userId } = req.user
            const favourite = await Favorite.findAll({
                where: {
                    userId
                }
            })
            res.status(200).json(favourite)
        } catch (error) {
            next(error)
        }
    }

    static async deleteFavourite(req, res, next) {
        try {
            const { id } = req.body
            const favourite = await Favorite.destroy({where: {id}})
            res.status(200).json({message: 'Success delete data'})
        } catch (error) {
            next(error)
        }
    }

    
}

module.exports = Controller
const axios = require('axios');
const { Bookmark } = require('../models');
const { Op } = require("sequelize");

class WeatherController {
    static async postBookmark(req, res, next) {
        try {
            const { CityName, StateName, CountryName } = req.body
            await Bookmark.create({ UserId: req.user.id, CityName, StateName, CountryName })
            res.status(200).json({ message: "Success Create Data" })
        } catch (error) {
            next(error)
            // console.log(error)
            // res.status(500).json({ message: "Internal server error" })
        }

    }

    static async getBookmark(req, res, next) {
        try {
            const bookmarks = await Bookmark.findAll({
                where: {
                    UserId: req.user.id
                }
            })
            if (bookmarks.length > 3) throw { name: "Badrequest" }
            let axiosArray = []
            bookmarks.forEach(bookmark => {
                let request = axios({
                    method: "GET",
                    url: `http://api.airvisual.com/v2/city?city=${bookmark.CityName}&state=${bookmark.StateName}&country=${bookmark.CountryName}&key=adff6230-bca9-4190-972a-219e13fb5087`,
                    data: { BookmarkId: bookmark.id }
                })
                axiosArray.push(request)
            })

            Promise.all(axiosArray).then((values) => {
                let data = values.map((el) => {
                    const bookmarkId = JSON.parse(el.config.data).BookmarkId
                    el.data.data.bookmarkId = bookmarkId
                    return el.data.data
                })
                res.status(200).json({
                    message: "Success read data",
                    data
                })
            })
                .catch((error) => {
                    // console.log(bookmarks.length)
                    // console.log(error)
                    res.status(error.response.status).json({ message: error.message })
                })

        } catch (error) {
            next(error)
            // res.status(500).json({ message: "Internal server error" })
        }
    }
    // adff6230-bca9-4190-972a-219e13fb5087

    static async deleteBookmarks(req, res, next) {
        try {
            const { id } = req.params

            let data = await Bookmark.destroy({
                where: {
                    id
                }
            })
            if (!data) throw { name: "NotFound" }
            res.status(200).json({
                message: "Data already delete"
            })
        } catch (error) {
            next(error)
            // res.status(500).json({ message: "Internal server error" })
        }
    }
}

module.exports = WeatherController
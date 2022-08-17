let {Item, Supplier, User, History, Cart} = require('../models')
let HistoryController = require('./historyController')
const { Op } = require('sequelize')
const newsAxios = require('../apis/newsApi')
const axios = require('axios')
const { getPagination, getPagingData } = require('../helpers/pagination')

class ItemController {
    static async itemList(req, res, next) {
        try {
            let items = await Item.findAll({
                include: {
                    all: true,
                    nested: true
                },
                order: ["id"]
            })
            let suppliers = await Supplier.findAll()
            res.status(200).json({
                message: "Item List", items, suppliers
            })
        } catch (error) {
            next(error)
        }
    }

    static async itemDetail(req, res, next) {
        try {
            let id = +req.params.id
            let item = await Item.findByPk(id, {
                include: {all:true, nested: true}})

            if (!item) throw {name: "Not Found"}

            res.status(200).json({
                message: 'This is the item', item
            })
        } catch (error) {
            next(error)
        }
    }

    static async addItem(req, res, next) {
        try {
            let {name, description, SupplierId, buyPrice, sellPrice, stock, imageUrl, UserId} = req.body
            let item = await Item.create({name, description, SupplierId, buyPrice, sellPrice, stock, imageUrl, UserId: +req.user.id})

            const user = await User.findByPk(+req.user.id, {attributes: ['username']})

            HistoryController.createHistory(item.id, item.name, `Item with id ${item.id} added`, user.username)

            res.status(201).json({
                message: "Sucess add item", item
            })
        } catch (error) {
            next(error)
        }
    }

    static async deleteItem(req, res, next) {
        try {
            let id = +req.params.id

            let temp = await Item.findByPk(id, {
                include: {all:true, nested: true}})

            const user = await User.findByPk(+req.user.id, {attributes: ["username"]})

            HistoryController.createHistory(temp.id, temp.name, `Item with id ${id} deleted`, user.username)

            let item = await Item.destroy({
                where: {id: id}
            })
            if (!item) {
                throw {name: "Item Not Found"}
            }          

            res.status(200).json({
                message: `Item with id ${id} has been deleted`
            })
        } catch (error) {
            next(error)
        }
    }

    static async updateItem(req, res, next) {
        try {
            const id = +req.params.id
            const {name, description, SupplierId, buyPrice, sellPrice, stock, imageUrl, UserId} = req.body

            const item = await Item.findByPk(id)

            if (!item) {
                throw {name: 'Item Not Found'}
            }
            const user = await User.findByPk(+req.user.id, {attributes: ["username"]})

            await Item.update({name, description, SupplierId, buyPrice, sellPrice, stock, imageUrl, UserId}, {where: {id}})

            HistoryController.createHistory(item.id, item.name, `Item with id ${id} updated`, user.username)

            res.status(200).json({
                message: `Sucess update item ${item.name}`
            })
        } catch (error) {
            next(error)
        }
    }

    static async listCart(req, res, next) {
        
        try {
            
            let data = await Cart.findAll({
                include: Item,
                where: {
                    UserId: +req.user.id
                }
            })

            res.status(200).json(data)

        } catch (error) {
            next(error)
        }
    }

    static async addToCart(req, res, next) {
        try {
            const id = +req.params.id

            const findItem = await Item.findByPk(id)

            if(!findItem) {
                throw {name: "Not found"}
            }

            let findCart = await Cart.findOne({
                where: {
                    UserId: +req.user.id,
                    ItemId: +findItem.id
                }
            })

            let data
            if (!findCart) {
                data = await Cart.create({
                    UserId: +req.user.id,
                    ItemId: +findItem.id,
                    quantity: 1
                })
            } else {
                const cartId = findCart.id
                data = await Cart.update({
                    quantity: findCart.quantity + 1
                }, {
                    where: {id: cartId}
                })
            }

            res.status(201).json({
                message: "Success", carts: data
            })

        } catch (error) {
            next(error)
        }
    }

    static async deleteCart(req, res, next) {
        try {
            const id = +req.params.id

            const findItem = await Item.findByPk(id)

            if(!findItem) {
                throw {name: "Not found"}
            }

            let findCart = await Cart.findOne({
                where: {
                    UserId: +req.user.id,
                    ItemId: +findItem.id
                }
            })

            let data

            if (findCart && findCart.quantity > 1) {
                const cartId = findCart.id
                data = await Cart.update({
                    quantity: findCart.quantity - 1
                }, {
                    where: {id: cartId}
                })
            }
            else {
                data = await Cart.destroy({
                    where : {UserId: +req.user.id,
                    ItemId: +findItem.id}
                })
            }       

            res.status(200).json({
                message: `Item ${findItem.name} has been deleted from your shopping cart`
            })
        } catch (error) {
            next(error)
        }
    }

    static async itemFilter(req, res, next) {
        try {
            const {page, size, name} = req.query

            let search = {status: 'active'}
            if (name) {
                search.name = {
                    [Op.iLike]: `%${name}%`
                }
            }

            const {limit, offset} = getPagination(page, size)
            let item = await Item.findAndCountAll({
                where: search,
                limit,
                offset,
                order: ['id']
            })

            const pagingResponse = getPagingData(item, page, limit)
            res.status(200).json({
                message: 'Success',
                items: pagingResponse
            })

        } catch (error) {
            console.log(error)
        }
    }

    static async itemPagination(req, res, next) {
        try {
            const {page, size} =  req.query
            const {limit, offset} =  getPagination(page, size)
            const item = await Item.findAndCountAll({
                where: {status: 'active'},
                limit,
                offset
            })
            const pagingResponse = getPagingData(item, page, limit)
            res.status(200).json({
                message: 'Success',
                item: pagingResponse
            })
        } catch (error) {
            console.log(error)
        }
    }

}

module.exports = ItemController
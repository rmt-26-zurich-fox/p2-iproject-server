const {User, Item, Supplier} = require('../models')

const authorization = async (req, res, next) => {
    
    try {      
        let food = await Item.findByPk(req.params.id)
        if (!food) {
            throw {name: 'Not found'}
        } 
        if (req.user.role === "admin") {
            next()
        }
        else if (food.authorId === req.user.id) {
            next()
        }
        else {
            throw {name: "Forbidden"}
        }
    } catch (error) {
        next(error)
    }
}

const adminAuthorization = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            throw {name: "Forbidden"}
        }
        next()
    } catch (error) {
        next(error)
    }
}

const customerAuthorization = async (req, res, next) => {
    try {
        if (req.user.role !== "customer") {
            throw {name: "Forbidden"}
        }
        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authorization, adminAuthorization, customerAuthorization }
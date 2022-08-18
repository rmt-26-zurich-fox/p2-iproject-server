const {History} = require('../models')

class HistoryController {
    static async createHistory(id, name, description, updatedBy) {
        try {
            const newHistory = {ItemId: +id, name: name, description: description, updatedBy: updatedBy}

            await History.create(newHistory)

        } catch (error) {
            return new Error(error)
        }
    }

    static async listHistory(req, res, next) {
        try {
            let history = await History.findAll()

            res.status(200).json({
                message: 'Sucess',
                history: history
            })
        } catch (error) {
           next(error) 
        }
    }
}

module.exports = HistoryController
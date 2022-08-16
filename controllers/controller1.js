

class Controller{
    static async register(req, res, next){
        try {
            res.status(201).json({message: 'be happi'})
        } catch (err) {
            next(err)
        }

    }
}

module.exports = Controller
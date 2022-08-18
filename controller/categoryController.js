const { Category } = require("../models");

class CategoryController {

    static async getAllCategories(req, res, next) {
        try {
             const id = +req.query.id;
             let categories;
             if(id) {
                categories = await Category.findOne({ where: {id} });
             } else {
                categories = await Category.findAll();
             }
             res.status(200).json({
                categories
             })
        } catch (error) {
            next(error);
        }
    }
    
}

module.exports = CategoryController;
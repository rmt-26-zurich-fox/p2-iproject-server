const { User } = require("../models");

class UserController {

    static async registerAdmin(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const registerAdmin = await User.create({ username, email, password, role: "Admin" });
            res.status(201).json({
                message: "Success create new Admin",
                id: registerAdmin.id,
                email : registerAdmin.email
            })
        } catch (error) {
            console.log(error);
            next(error);
        }
    } 
    
    static async registerVisitor(req, res, next) {
        try {
            const { username, email, password } = req.body;
            const registerVisitor = await User.create({ username, email, password, role: "Visitor" });
            res.status(201).json({
                message: "Success create new Visitor",
                id: registerVisitor.id,
                email : registerVisitor.email
            })
        } catch (error) {
            next(error);
        }
    } 
    
}

module.exports = UserController;
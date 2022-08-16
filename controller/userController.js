const { User } = require("../models");
const { comparePassword } = require("../helpers/bcryptjs");
const { createToken } = require("../helpers/jwt");

class UserController {

    // Register Admin
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
    
    // Register Vistor
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

    // Login Users
    static async loginUsers(req, res, next) {
        try {
            const { email, password } = req.body;
            if(!email) throw { name: "false"};
            if(!password) throw { name: "false"};

            const findUser = await User.findOne({ where: {email} });
            if(!findUser) throw { name: "userNotFound" };
            const idPassValid = comparePassword(password, findUser.password);
            const payload = {
                id: findUser,
                username: findUser.username,
                role: findUser.role
            }
            const token = createToken(payload);
            res.status(200).json({
                access_token: token
            });
        } catch (error) {
            next(error);
        }
    }
   
}

module.exports = UserController;
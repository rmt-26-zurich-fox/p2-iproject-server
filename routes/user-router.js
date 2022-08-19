const UserController = require('../controllers/user-controller')

const userRouter = require('express').Router()

userRouter.post('/register', UserController.userRegister)
userRouter.post('/login', UserController.userLogin)

module.exports = userRouter
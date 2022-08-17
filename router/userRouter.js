const userRouter = require('express').Router()
const UserController = require('../controller/UserController')

userRouter.get('/', UserController.readAllUser)
userRouter.post('/', UserController.addUser)
userRouter.put('/:userId', UserController.updateUser)
userRouter.get('/:userId', UserController.showUser)

module.exports = userRouter
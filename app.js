if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT ||  3000
const controller1 = require('./controllers/controller1')
const controller2 = require('./controllers/controller2')
const authentication = require('./middlewares/authentication')
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.post('/register' , controller1.register)
app.post('/login', controller1.login)
app.get('/product', controller1.fetchProduct)
app.use(authentication)
app.get('/test', async(req,res,next)=>{
 try {
    res.status(200).json({test: "tests;lksdnf;akl"})
 } catch (err) {
    next(err)
 }
} )

app.use(async(err, req, res, next)=>{
    let code = 500
    let message = 'Internal Server Error'
    console.log(err)
if(err.name === "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
    message = err.errors[0].message
}else if( err.message == "Invalid username/password"){
    message = err.message
}else if( err.name == "JsonWebTokenError"){
    message = 'Invalid Token'
}
    res.status(code).json(message)
})




app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})

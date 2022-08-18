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
app.post('/google-sign-in', controller1.googleLogin)
app.get('/products', controller1.fetchProduct)
app.get('/products/:id', controller1.productDetail)

app.use(authentication)
app.get('/shoppingcarts', controller1.shoppingCart)
app.post('/shoppingcarts/:productId', controller1.createShoppingCart)
app.delete('/shoppingcarts/:id', controller2.deleteCart)
app.post('/couriers' , controller2.fetchCostRajaOngkir)
app.get('/city' , controller2.fetchCityRajaOngkir)




app.use(async(err, req, res, next)=>{
    let code = 500
    let message = 'Internal Server Error'
    console.log(err)
if(err.message == "Product isn't Found"){
        message = "Product isn't Found"
        code = 404
}else if(err.name === "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError" ){
    message = err.errors[0].message
    code = 400
}else if( err.message == "Invalid username/password"){
    message = err.message
    code = 401
}else if( err.name == "JsonWebTokenError" || err.message == "Invalid Token" ||err.name == "TokenExpiredError"){
    message = 'Invalid Token'
    code = 401

}else if(err.message == "You've already added this Product to your shopping cart before" || err.message == "destination and courier is required"){
    message = err.message
    code = 400

}else if(err.name == "AxiosError"){
code = err.response.status
message = err.response.statusText
}
    res.status(code).json(message)
})




app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})

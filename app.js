if(process.env.NODE_ENV != "production"){
    require("dotenv").config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT ||  3000
const controller1 = require('./controllers/controller1')
const controller2 = require('./controllers/controller2')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.post('/register' , controller1.register)

app.use(async(err, req, res, next)=>{
    let code = 500
    let message = 'Internal Server Error'
    console.log(err)
if(err.name === "SequelizeValidationError" || err.name == "SequelizeUniqueConstraintError"){
    message = err.errors[0].message
}
    res.status(code).json(message)
})




app.listen(port,()=>{
    console.log(`Running on port ${port}`)
})

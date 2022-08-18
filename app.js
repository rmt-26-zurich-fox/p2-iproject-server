if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const express= require('express');
const { ErrorHandler } = require('./middlewares/ErrorHandler');
const app= express()
const port=  process.env.PORT||3000
const router= require('./routes/index.js');
const cors= require('cors');

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)

app.use(ErrorHandler)

app.listen(port, ()=>{
    console.log(`CONNECTED TO PORT ${port}`);
})
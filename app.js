if (process.env.NODE_ENV != "production") {
    require("dotenv").config()
  } 
  
  const cors = require('cors')
  
  const express = require('express')
  const router = require('./routers/index')
  const app = express()
  const port = process.env.PORT || 3000
  const errorHandler = require('./middlewares/errorHandler')
  
  app.use(cors())
  
  app.use(express.urlencoded({extended: false}))
  app.use(express.json())
  app.use(router)
  app.use(errorHandler)
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  }) 
  
  module.exports = app
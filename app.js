require("dotenv").config()
const express = require('express')
const cors = require('cors')
const router = require('./router/index')
const errorHandle = require("./middleware/errorHandle")
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.use('/', router)

app.use(errorHandle)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
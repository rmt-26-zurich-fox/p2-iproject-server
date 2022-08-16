if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/error')
const router = require('./routes/index')
const app = express()
const port = process.env.PORT || 3000

//Middleware
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

//Routes
app.use(router)

//Middleware error handler
app.use(errorHandler)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

module.exports = app
const express = require('express')
const routes = require('./routes')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`app is running on http://localhost${port}`)
})
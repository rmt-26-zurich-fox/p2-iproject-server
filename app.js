const express = require('express')
const cors = require('cors')
const Controller = require('./controller/locationController')
const app = express()
const port = 3000

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.get('/location', Controller.getLocation)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
const cors = require('cors');
const express = require('express');
const app = express()
const port = 3000
const route = require('./route/index');

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', route)

app.listen(port, () => {
    console.log(`Success listen to the ${port}`);
})

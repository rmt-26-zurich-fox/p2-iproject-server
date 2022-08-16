if (process.env.NODE_ENV != "production") {
    require('dotenv').config();
}
const cors = require('cors');
const express = require('express');
const errorHandle = require('./middleware/errorhandle');
const app = express()
const port = 3000
const route = require('./route/index');

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', route)

app.use(errorHandle)

app.listen(port, () => {
    console.log(`Success listen to the ${port}`);
})

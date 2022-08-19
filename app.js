if(process.env.NODE_ENV !== "production"){
    require("dotenv").config()
}
const router = require("./routes")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const {OAuth2Client} = require('google-auth-library')

app.use(cors())
app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(router)  

app.use((err, req, res, next) => {
    // console.log("HAI DARI ERROR HANDLER");
    console.log(err, "<<<<< Hai dari error handler")
    if(err.name == "SequelizeUniqueConstraintError" || err.name == "SequelizeValidationError"){ 
        res.status(400).json({message: err.errors[0].message})
    } else if (err.name == "NoToken") {
        res.status(401).json({message: "Please Login"})
    } else if (err.name == "Unauthorized" || err.name == "JsonWebTokenError"){
        res.status(401).json({message: "Invalid Token"})
    } else if (err.name == "invalid_email/password"){
        res.status(401).json({message: "user not found!"})
    } else if (err.name == "Forbidden"){
        res.status(403).json({message: "access denied!"})
    } else if (err.name == "MovieIdNotFound") {
        res.status(404).json({message: "Movie Not Found"})
    } else if (err.name == "wrong_password") {
        res.status(404).json({message: "incorrect password!"})
    } else if (err.name == "NotFound") {
        res.status(404).json({message: "Not Found"})
    } else if (err.name == "noImage"){
        res.status(401).json({message: "try again!"})
    } else {
        console.log(err);
        res.status(500).json({message: "Internal server error"})
    }
})

app.listen(port, () => {
    console.log(`app running on http:/localhost:${port}`)
})
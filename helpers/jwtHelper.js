const jwt =require('jsonwebtoken');
let secretPass= process.env.SECRET_KEY

let createToken= (payload)=> jwt.sign(payload,secretPass)

let verifyToken= (token)=> jwt.verify(token,secretPass)

module.exports={createToken, verifyToken}
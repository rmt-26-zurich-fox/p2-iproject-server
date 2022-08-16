if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
  }
const cors = require('cors')
const express = require('express')
const router = require('./routes')
const app = express()
const port = 4000
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
    cors: {
      origins: ['http://localhost:5173']
    }
  });
  
  io.on('connection', (socket) => {
      console.log('a user connected');
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  
      socket.on('my message', (msg) => {
          console.log('message: ' + msg);
        });
    });
    io.on('connection', (socket) => {
      socket.on('my message', (msg) => {
        io.emit('my broadcast', `server: ${msg}`);
      });
    });


app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

http.listen(port, () => console.log('listen to port ' + port))
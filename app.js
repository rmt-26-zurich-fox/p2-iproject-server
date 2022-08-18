if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routes/index");
const cors = require("cors");

// SOCKET
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
// const io = new Server(server);

const io = require("socket.io")(server, {
  cors: {
    origins: ["http://127.0.0.1:8080"],
  },
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);

// app.listen(port, () => {
//   console.log(`App is listening to ${port}`);
// });
let messages = [];
let users = [];

io.on("connection", (socket) => {
  socket.emit("init-chat", messages);
  socket.emit("update-users", users);
  socket.on("send-msg", function (data) {
    var newMessage = {
      text: data.message,
      user: data.user,
    };
    messages.push(newMessage);
    io.emit("read-msg", newMessage);
  });

  socket.on("add-user", function (user) {
    users.push({ id: socket.id, name: user });
    io.emit("update-users", users);
  });

  // When user disconnects the server updates user list and emits an event
  socket.on("disconnect", function () {
    users = users.filter(function (user) {
      return user.id != socket.id;
    });
    io.emit("update-users", users);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});
app.get("/socket-chat", (req, res) => {
  console.log("MASUK SINI");
});
server.listen(port, () => {
  console.log("listening on *:3000");
});

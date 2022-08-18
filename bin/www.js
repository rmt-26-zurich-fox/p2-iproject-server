if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = require("../app");
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${server.address().port}`);
});
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  socket.on("message", (data) => {
    console.log("user sending message with: ", data);
  });
  console.log("a user connected");
});

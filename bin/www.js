if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const app = require("../app");
const server = app.listen(process.env.PORT || 3000, () => {
  console.log(`Express server listening on port ${server.address().port}`);
});
const { Server } = require("socket.io");
const Controller = require("../controllers/controller");
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
let connectedUser = [];

io.on("connection", async (socket) => {
  const { email } = socket.handshake.query;
  await Controller.createUser(email);
  connectedUser.push(email);
  socket.on("message", (data) => {
    console.log("user sending message with: ", data);
  });
  console.log("a user connected");

  socket.on("startgame", async (data) => {
    const question = await Controller.getQuestion();
    io.emit("gamestarted", question);
    let counter = 5;
    const interval = setInterval(() => {
      counter -= 1;
      io.emit("counter", counter);
      if (counter === 0) {
        Controller.getResult(connectedUser, question).then((answers) => {
          io.emit("gamefinished", { finished: true, answers });
        });
        clearInterval(interval);
      }
    }, 1000);
  });

  socket.on("answer", async (data) => {
    await Controller.saveAnswer(data);
  });

  socket.on("disconnect", (data) => {
    connectedUser = connectedUser.filter((user) => user !== data);
  });
});

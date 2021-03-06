const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre
app.use(express.json());
var clients = {};

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id);
    clients[id] = socket;
    console.log(clients);
  });

  //send message to the target user
  socket.on("message", (msg) => {
    console.log(msg);
    let targetId = msg.targetId;
    console.log("Avinash"+clients[targetId]);
    if (clients[targetId]) clients[targetId].emit("message", msg);
  });

  //typing indicator
  socket.on('typing', function name(data) {
    console.log(data);
    io.emit('typing', data)
  })

  socket.on('disconnect', function () {
    console.log('client disconnect...', socket.id)
    // handleDisconnect()
  })

  socket.on('error', function (err) {
    console.log('received error from client:', socket.id)
    console.log(err)
  })
});

server.listen(port, "0.0.0.0", () => {
  console.log("server started");
});

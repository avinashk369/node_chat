const express = require("express");
var http = require("http");
const app = express();
const port = process.env.PORT || 5000;
var server = http.createServer(app);
var io = require("socket.io")(server);

//middlewre
app.use(express.json());

io.on("connection", (socket) => {
  console.log("connetetd");
  console.log(socket.id, "has joined");
  socket.on("signin", (id) => {
    console.log(id.id+" socket id "+socket.id);
    io.to(id.id).emit("message", id);
  });

  //send message to the target user
  socket.on("message", (msg) => {
    console.log(msg);
    //if (clients[targetId]) 
    for(var i=0;i<10;i++)
      io.to(msg.targetId).emit("message", msg);
  });

  
  socket.on('disconnect', function () {
    console.log('client disconnect...', socket.id)
    // handleDisconnect()
  })

  socket.on('error', function (err) {
    console.log('received error from client:', socket.id)
    console.log(err)
  })
});

server.listen(port, "0.0.0.0", (err) => {
  if (err) throw err
  console.log('Listening on port %d', port);
});

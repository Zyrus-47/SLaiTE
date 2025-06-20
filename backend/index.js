const express = require('express');
const app = express();
const server = require('http').createServer(app);
const { Server } = require("socket.io");
const { addUser, getUser, removeUser } = require('./utils/users');
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("this is project SLaiTE");
});

let roomIdGlobal, imgURLGlobal;

io.on("connection", (socket) => {
  socket.on("userJoined", (data) => {
    const { name, userId, roomId, host, presenter } = data;
    roomIdGlobal = roomId;
    socket.join(roomId);
    const users = addUser({ name, userId, roomId, host, presenter,socketId: socket.id });

    socket.emit("userIsJoined", { sucess: true, users });
    socket.broadcast.to(roomId).emit("userJoinedMessageBroadcasted", name);
    socket.broadcast.to(roomId).emit("allUsers", users);
    socket.broadcast.to(roomId).emit("whiteBoardDataResponse", {
      imgURL: imgURLGlobal,
    });
  });

  socket.on("whiteboardData", (data) => {
    imgURLGlobal = data;
    socket.broadcast.to(roomIdGlobal).emit("whiteBoardDataResponse", {
      imgURL: data,
    });
  });
  console.log(socket.id);

  socket.on("disconnect", () => {
    const user= getUser(socket.id);
    
    if(user){
    removeUser(socket.id);
    socket.broadcast.to(roomIdGlobal).emit("userLeftMessageBroadcasted",user.name );
    }
  });
});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log("server is running on localhost 5000"));

const express = require('express');
const app =express();

const server = require('http').createServer(app);
const {Server} =require ("socket.io");

const io= new Server(server);

app.get("/",(req,res)=>{
    res.send("this is project SLaiTE");
});

io.on("connection",(socket)=>{
    socket.on("userJoined",(data)=>{
        const{name,userId,roomId,host,presenter}=data;
        socket.join(roomId);
        socketemit("userIsJoined",{sucess: true});
    })
});




const port =process.env.PORT || 5000;
server.listen(port,()=> console.log("server is running on local host 5000"))
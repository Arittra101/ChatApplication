const express = require("express");

const app = express();
const path = require("path");
console.log(path.join(__dirname, "../ind"));
app.use(express.static(path.join(__dirname, "ind")));
const conncetionUser = new Set();

const server = app.listen(3000, () => {
  console.log("listening");
});

// const io = require('socket.io')(server);
//---------setUp socket--------------------
const socketIO = require("socket.io");
const io = socketIO(server);
//--------------------------------

const onConnected = (socket) => {
  //ekhane sobai asbe any event e id soho
  conncetionUser.add(socket.id);
  console.log(socket.id);
  console.log(conncetionUser.size);
  let txt;

  io.emit("client-total", conncetionUser.size);
  socket.on("disconnect", () => {
    console.log("Socket disconneted " + socket.id);
    conncetionUser.delete(socket.id);
    io.emit("client-total", conncetionUser.size);
  });

  //from client  event emit
  socket.on("message", (user) => {
    //console.log(user);
    socket.broadcast.emit("chat-message", user);
  });

  socket.on("Typingbro", (user) => {
    const myuser = {
      Name: user.name,
      lock: 1,
    };
    socket.broadcast.emit("type-khela", myuser);

    console.log(myuser);
  });

  socket.on("TypingOff", (user) => {
    //console.log(user.name);
    const myuser = {
      Name: user.name,
      lock: 0,
    };
    socket.broadcast.emit("type-khela", myuser);
  });

  
};

io.on("connection", onConnected);

/*
info:
Use io.emit when you want to send an event to all connected clients(main).
Use socket.broadcast.emit when you want to send an event to all connected 
clients except the one that triggered the event.

*/

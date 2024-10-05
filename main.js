require("dotenv").config();
const express = require("express"); // use express
const app = express(); // create instance of express
const server = require("http").Server(app); // create server
const io = require("socket.io")(server); // create instance of socketio

let users = {};

app.use(express.static("public")); // use "public" directory for static files

io.on("connection", (socket) => {
  socket.on("join-room", (username, roomId) => {
    socket.join(roomId);
    users[socket.id] = { name: username, room: roomId };
    socket.broadcast.to(roomId).emit("joined-room", username, roomId);
  });
  socket.on("value-send", (num, text, room) => {
    socket.broadcast.to(room).emit("value-recive", num, text);
  });
});
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
